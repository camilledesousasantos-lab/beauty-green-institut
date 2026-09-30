#!/usr/bin/env node
// test-guard.mjs
//
// PROVES: that a PR does not silently weaken the test suite between a base ref and a head
// ref —
//   rule 1 (deleted): a deleted test file, a test file whose type changed (typechange T: replaced
//     by a symlink or a submodule), and a rename that takes a test file out of its collection
//     signature (the .test/.spec suffix kind, the extension, the e2e/ tests/ __tests__/ root);
//   rule 2 (count): fewer test declarations or fewer expect( calls, without an allow;
//   rule 3 (marker, never exempted by allow): more `.skip( .skipIf( .only( .fixme( .fail(
//     .fails( .todo( .runIf(` calls on a file that already existed (whitespace before `(`
//     allowed, so testInfo.fail(), test.info().fail() and `test.skip (` count), and a `.configure(`
//     call added or changed in an existing test file (test.describe.configure retries / mode);
//   rule 4 (config), in three shapes:
//     - a runner config (vitest.config.*, playwright.config.*): ANY diff — modified, deleted,
//       renamed, type-changed, or a second config ADDED — when the base already has a config for
//       that runner. Every key of these files chooses what runs and how strictly (retries,
//       projects, ignoreSnapshots, snapshot tolerances, forbidOnly, testIgnore...): an allow-list
//       of harmless keys would be one more list to enumerate, so the whole file is pinned;
//     - a CI definition (.github/workflows/**, .github/actions/**) present at base: ANY diff, with
//       a separate line for the workflow's `on:` block (its triggers), an `if:` added, a line that
//       runs the tests (npm test, vitest, playwright test, test-guard, the guard's own
//       `node "$GUARD"`) removed or rewritten; a deleted definition;
//     - package.json: an added `|| true`, `--passWithNoTests`, -x/--bail, any change to the
//       `test` or `e2e` script, a deleted file;
//     plus, on any config file, an added `continue-on-error` (any value but false);
//   rule 6 (dilution): an assertion whose matcher got weakened while the raw counts stayed flat,
//     including a matcher on its own line after a multi-line expect(;
//   rule 7 (guard): any change to this guard itself, scripts/test-guard.mjs.
// Rules 2 and 3 count on the content with // and /* */ comments stripped (strings kept): a
// test wrapped in a block comment is a test removed.
//
// SELF-PROTECTION: the guard runs from its own workflow (guard.yml in .github/workflows/) on
// `pull_request_target`: GitHub takes that workflow from the DEFAULT BRANCH, never from the PR,
// so a PR cannot skip, swallow or rewrite the step that judges it. The step checks out the PR
// head as data only (no npm ci, nothing from the PR runs), extracts THIS file from the default
// branch (`git show "$GUARD_REF":scripts/test-guard.mjs`, GUARD_REF = github.sha = the last
// commit on the default branch) and runs it. Rule 7 refuses an edit of this file; rule 4 refuses
// an edit of guard.yml. BOOTSTRAP: pull_request_target only runs a workflow file that already
// exists on the default branch, so the PR that installs guard.yml is the one PR the guard
// cannot judge — it is read by hand (the recette sheet prints a red banner when a PR touches
// .github/ or this file). When the default branch has no guard, the job fails (never green).
//
// HUMAN PATH (« Changements de CI assumés », kit README): a PR whose ONLY violations are
// `VIOLATION config` / `VIOLATION guard` lines, each quoted and justified in the PR body, is
// merged by Brice after he reads them — never for `deleted`, `count`, `marker` or `dilution`.
// The verdict says which case applies on stderr (`chemin humain : possible|exclu`).
//
// LETS THROUGH DELIBERATELY:
//   - a brand-new test file (rules 2/3/6 only compare a file present at BOTH base and head;
//     a new file may carry test.fail( / .skip( for a documented, expected failure)
//   - removing an existing test.fail( (rule 5 — the underlying defect got fixed)
//   - a file whose story tag (@US-N) is in the allow list, for rules 2 and 6 ONLY — rule 1
//     (deletion), rule 3 (markers), rule 4 and rule 7 are never exempted
//   - any change to a non-test file that isn't one of rule 4's config paths
//   - a package.json or CI definition ADDED by the PR, a runner config added when the base has
//     none for that runner (bootstrap — its `retries:` is still checked), and a `test` / `e2e`
//     script that did not exist at base (nothing to narrow yet)
//   - a short-circuit INSIDE a test body — an early `return`, an `if (false)` around the
//     assertions, assertions moved into a function nobody calls: the counts do not move.
//     Backstop: D3, Brice's recette of the stories the PR delivers, and the fresh-context review
//   - a weakening routed through another file: a config value imported from another module, a
//     setup file (vitest.setup.*, a Playwright global setup) that overrides a matcher, an
//     assertion moved into a helper that stops asserting
//   - what the guard never sees because it does not run: a direct push to the default branch
//     (no PR), and a PR whose head branch name GitHub refuses for pull_request_target (names
//     that look like SHAs). The guard check is then ABSENT, and the merge criterion refuses a PR
//     without a `guard` check coming from pull_request_target (`gh pr checks … --json event`)
//
// Allow list = union of --allow (comma list) and --allow-file (read from HEAD via
// `git show <head>:<path>`, one US-N per line, # comments / blank lines ignored; a missing
// file is an empty list — printed as a NOTE on stderr, never an error).
//
// .delivery/stories-touched is written by /execute from the plan's "## Stories → Touched"
// section and is visible in the PR diff — it is not produced by this script.
//
// The comparison starts at the MERGE-BASE of --base and --head (what GitHub shows as the PR
// diff): a test file added on the base branch after the fork is not a deletion on the PR.
// A bootstrap runner config with no `retries:` counts as 0 (Playwright's default).
// Every git failure on the decision path exits 2 (never swallowed — harness/RULES.md rule 5).
//
// Exit: 0 clean · 1 at least one violation (one `VIOLATION <rule> <file>: …` line each) · 2 usage.

import { execFileSync } from "node:child_process";

const USAGE =
  "usage: test-guard.mjs --base <ref> --head <ref> [--allow US-1,US-2] [--allow-file <path>]";

function usageError(msg) {
  process.stderr.write(`${msg}\n${USAGE}\n`);
  process.exit(2);
}

function parseArgs(argv) {
  const opts = { base: null, head: null, allow: [], allowFile: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--base") {
      opts.base = argv[++i];
    } else if (arg === "--head") {
      opts.head = argv[++i];
    } else if (arg === "--allow") {
      opts.allow = (argv[++i] || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (arg === "--allow-file") {
      opts.allowFile = argv[++i];
    } else {
      usageError(`unknown flag: ${arg}`);
    }
  }
  if (!opts.base) usageError("missing --base");
  if (!opts.head) usageError("missing --head");
  return opts;
}

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function resolveRef(ref) {
  try {
    return git(["rev-parse", "--verify", `${ref}^{commit}`]).trim();
  } catch {
    usageError(`unresolvable ref: ${ref}`);
    return undefined; // unreachable, usageError exits
  }
}

function showFile(ref, filePath) {
  // null = the path does not exist at that ref (a normal answer for the allow file or an
  // added config file); any other git failure is a usage error, never a silent "absent".
  try {
    git(["cat-file", "-e", `${ref}:${filePath}`]);
  } catch {
    return null;
  }
  try {
    return git(["show", `${ref}:${filePath}`]);
  } catch (err) {
    usageError(`git show ${ref}:${filePath} failed: ${err.message}`);
    return null;
  }
}

function mergeBase(base, head) {
  try {
    return git(["merge-base", base, head]).trim();
  } catch (err) {
    usageError(`no merge-base between ${base} and ${head}: ${err.message}`);
    return undefined;
  }
}

function nameStatus(base, head) {
  let out;
  try {
    out = git(["diff", "--name-status", "-M", base, head]);
  } catch (err) {
    usageError(`git diff failed: ${err.message}`);
    return [];
  }
  return out
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("\t");
      const status = parts[0];
      if (status[0] === "R" || status[0] === "C") {
        return { status: status[0], oldPath: parts[1], newPath: parts[2] };
      }
      return { status: status[0], path: parts[1] };
    });
}

// Root-level files of a ref: which runners (vitest, playwright) the base already configures.
function rootFiles(ref) {
  try {
    return git(["ls-tree", "--name-only", ref]).split("\n").filter(Boolean);
  } catch (err) {
    usageError(`git ls-tree ${ref} failed: ${err.message}`);
    return [];
  }
}

function diffU0(base, head, paths) {
  try {
    return git(["diff", "-U0", "-M", base, head, "--", ...paths]);
  } catch (err) {
    usageError(`git diff -U0 failed: ${err.message}`);
    return "";
  }
}

// ---------------------------------------------------------------------------
// Test-file / config-file classification
// ---------------------------------------------------------------------------

const TEST_EXT = "(?:ts|tsx|js|jsx|mjs|cjs)";
const TEST_SUFFIX_RE = new RegExp(`\\.(?:test|spec)\\.${TEST_EXT}$`);
const TEST_DIR_RE = new RegExp(
  `(?:^|/)(?:e2e|tests|__tests__)/.*\\.${TEST_EXT}$`,
);

function isTestFile(p) {
  return TEST_SUFFIX_RE.test(p) || TEST_DIR_RE.test(p);
}

function isConfigFile(p) {
  return p === "package.json" || isRunnerConfig(p) || isCiDefinition(p);
}

function runnerOf(p) {
  const m = p.match(/^(vitest|playwright)\.config\.[^/]+$/);
  return m ? m[1] : null;
}

function isRunnerConfig(p) {
  return runnerOf(p) !== null;
}

function isWorkflow(p) {
  return p.startsWith(".github/workflows/");
}

// What GitHub Actions executes: the workflows and the local actions they call (`uses: ./.github/actions/…`).
function isCiDefinition(p) {
  return isWorkflow(p) || p.startsWith(".github/actions/");
}

const GUARD_SELF = "scripts/test-guard.mjs";

// A test file's collection signature: the .test/.spec suffix kind, the extension, and the path
// up to its e2e/ tests/ __tests__/ root. vitest collects `*.test.{ts,tsx}`, Playwright collects
// under its testDir: a rename that changes any of the three can take the file out of its run.
function testSignature(p) {
  const suffix = p.match(new RegExp(`\\.(test|spec)\\.(${TEST_EXT})$`));
  const ext = p.match(new RegExp(`\\.(${TEST_EXT})$`));
  const root = p.match(/^(.*?(?:^|\/)(?:e2e|tests|__tests__)\/)/);
  return `${suffix ? suffix[1] : "-"}|${ext ? ext[1] : "-"}|${root ? root[1] : "-"}`;
}

function leavesTestGlob(oldPath, newPath) {
  if (!isTestFile(oldPath)) return false;
  return (
    !isTestFile(newPath) || testSignature(oldPath) !== testSignature(newPath)
  );
}

// ---------------------------------------------------------------------------
// Content analysis
// ---------------------------------------------------------------------------

const TEST_DECL_RE =
  /\b(?:test|it)(?:\.(?:only|skip|fixme|fail|slow))?\s*\(\s*['"`]/g;
const EXPECT_RE = /expect\(/g;
// The runners' "do not run / do not fail" family, on any receiver (test., it., describe.,
// testInfo., test.info().), whitespace allowed before the call. `.failure(` is not in it.
const MARKER_RE = /\.(?:skip(?:If)?|only|fixme|fails?|todo|runIf)\s*\(/g;
const CONFIGURE_RE = /\.configure\s*\(/g;
const CHAIN_MATCHER_RE = /^\s*\.(?:not\.)?(?:to|resolves|rejects)\w*/;
// A matcher on its own line after a multi-line call: `  ).toBeVisible()`, `  })).toEqual(…)`.
const CLOSING_MATCHER_RE = /^\s*[)\]}]+\.(?:not\.)?(?:to|resolves|rejects)/;
const STORY_TAG_RE = /@US-\d+/g;

// Rule 4: the package scripts that run the tests (runner configs and CI definitions are pinned whole).
const PINNED_SCRIPTS = ["test", "e2e"];
const WORKFLOW_IF_RE = /^\s*(?:-\s+)?if\s*:/;
const WORKFLOW_TEST_RUN_RE =
  /\bnpm\s+(?:run\s+)?(?:test|e2e)\b|\bvitest\b|\bplaywright\s+test\b|test-guard|\$GUARD\b/;
const CONTINUE_ON_ERROR_RE = /continue-on-error\s*:\s*(?!false\b)\S/;
const HUMAN_PATH_RE = /^VIOLATION (?:config|guard) /;

// Strips // and /* */ comments, keeps strings (', ", `) intact: a '/*' inside a string opens
// no comment. Outside strings a backslash escapes the next character (regex literals such as
// /https:\/\//). Block comments keep their newlines. Not a parser: a quote inside a regex
// literal can misread the rest of THAT line — identically at base and head.
function stripComments(src) {
  let out = "";
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    const next = src[i + 1];
    if (c === "\\") {
      out += c + (next ?? "");
      i += 2;
    } else if (c === "/" && next === "/") {
      while (i < n && src[i] !== "\n") i += 1;
    } else if (c === "/" && next === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) {
        if (src[i] === "\n") out += "\n";
        i += 1;
      }
      i += 2;
    } else if (c === "'" || c === '"' || c === "`") {
      out += c;
      i += 1;
      while (i < n && src[i] !== c) {
        if (src[i] === "\\") {
          out += src[i] + (src[i + 1] ?? "");
          i += 2;
          continue;
        }
        if (src[i] === "\n" && c !== "`") break;
        out += src[i];
        i += 1;
      }
      if (i < n && src[i] === c) {
        out += c;
        i += 1;
      }
    } else {
      out += c;
      i += 1;
    }
  }
  return out;
}

// The value text after `key:` up to the `,` or closing bracket that ends it at depth 0,
// strings skipped, whitespace and trailing commas removed (a reformat is not a change).
function readValue(src, start) {
  let depth = 0;
  let i = start;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === "'" || c === '"' || c === "`") {
      i += 1;
      while (i < n && src[i] !== c) i += src[i] === "\\" ? 2 : 1;
    } else if (c === "[" || c === "{" || c === "(") {
      depth += 1;
    } else if (c === "]" || c === "}" || c === ")") {
      if (depth === 0) break;
      depth -= 1;
    } else if (c === "," && depth === 0) {
      break;
    }
    i += 1;
  }
  return src
    .slice(start, i)
    .replace(/\s+/g, "")
    .replace(/,(?=[\]})])/g, "");
}

// The argument of every `.configure(` call (test.describe.configure({ retries, mode, timeout })),
// comments stripped and whitespace normalised.
function configureCalls(strippedSrc) {
  return [...strippedSrc.matchAll(CONFIGURE_RE)].map((m) =>
    readValue(strippedSrc, m.index + m[0].length),
  );
}

// A workflow's `on:` block (its triggers): the top-level `on:` line and its indented body,
// comment and blank lines dropped. Two workflows with the same triggers read identical.
function onBlock(content) {
  const lines = content.split("\n");
  const start = lines.findIndex((line) => /^(?:on|"on"|'on')\s*:/.test(line));
  if (start === -1) return "";
  const block = [lines[start].replace(/\s+#.*$/, "").trim()];
  for (const line of lines.slice(start + 1)) {
    if (line.trim() === "" || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) break;
    block.push(line.replace(/\s+#.*$/, "").trimEnd());
  }
  return block.join("\n");
}

function scriptValue(content, name, label) {
  if (!content) return undefined;
  try {
    const scripts = JSON.parse(content).scripts || {};
    return scripts[name];
  } catch (err) {
    usageError(`${label}: package.json illisible (${err.message})`);
    return undefined;
  }
}

// Lines of `a` whose trimmed text is not matched one-for-one in `b` (a moved line is not new).
function unmatchedLines(a, b) {
  const pool = new Map();
  for (const line of b) pool.set(line.trim(), (pool.get(line.trim()) || 0) + 1);
  return a.filter((line) => {
    const left = pool.get(line.trim()) || 0;
    if (left > 0) {
      pool.set(line.trim(), left - 1);
      return false;
    }
    return true;
  });
}

function countMatches(content, re) {
  const m = content.match(re);
  return m ? m.length : 0;
}

function getTags(content) {
  const m = content.match(STORY_TAG_RE);
  return new Set((m || []).map((t) => t.slice(1)));
}

function isAllowed(content, allowSet) {
  if (!content) return false;
  const tags = getTags(content);
  for (const t of tags) {
    if (allowSet.has(t)) return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Allow list
// ---------------------------------------------------------------------------

function buildAllowSet(opts, head) {
  const allow = new Set(opts.allow);
  if (opts.allowFile) {
    const content = showFile(head, opts.allowFile);
    if (content === null) {
      process.stderr.write(
        `NOTE: --allow-file ${opts.allowFile} not found at ${head} — treating allow list as empty for it\n`,
      );
    } else {
      for (const rawLine of content.split("\n")) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;
        allow.add(line);
      }
    }
  }
  return allow;
}

// ---------------------------------------------------------------------------
// Diff line helpers (rule 4 added lines, rule 6 removed lines)
// ---------------------------------------------------------------------------

function isDiffMetaLine(line) {
  return (
    line.startsWith("diff --git") ||
    line.startsWith("index ") ||
    line.startsWith("--- ") ||
    line.startsWith("+++ ") ||
    line.startsWith("@@") ||
    line.startsWith("rename ") ||
    line.startsWith("similarity index") ||
    line.startsWith("new file mode") ||
    line.startsWith("deleted file mode")
  );
}

function addedLines(diffText) {
  const out = [];
  for (const line of diffText.split("\n")) {
    if (isDiffMetaLine(line)) continue;
    if (line.startsWith("+")) out.push(line.slice(1));
  }
  return out;
}

function removedLines(diffText) {
  const out = [];
  for (const line of diffText.split("\n")) {
    if (isDiffMetaLine(line)) continue;
    if (line.startsWith("-")) out.push(line.slice(1));
  }
  return out;
}

function maxRetries(content) {
  // Absent file or absent key = 0 retries (Playwright's default), so a bootstrap config with
  // `retries: 0` is not an increase while `retries: 2` is.
  if (!content) return 0;
  let max = 0;
  const re = /retries:\s*(-?\d+)/g;
  for (const match of content.matchAll(re)) {
    const n = Number(match[1]);
    if (n > max) max = n;
  }
  return max;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const head = resolveRef(opts.head);
  const base = mergeBase(resolveRef(opts.base), head);
  const allowSet = buildAllowSet(opts, head);

  const violations = [];
  let comparedCount = 0;

  const entries = nameStatus(base, head);

  for (const entry of entries) {
    if (entry.status === "D") {
      if (isTestFile(entry.path)) {
        violations.push(
          `VIOLATION deleted ${entry.path}: fichier de test supprimé entre base et head`,
        );
      }
      continue;
    }

    if (entry.status === "T") {
      // Typechange: the path now holds a symlink or a submodule — its tests are no longer collected.
      if (isTestFile(entry.path)) {
        violations.push(
          `VIOLATION deleted ${entry.path}: type de fichier changé (lien symbolique ou sous-module) — vaut suppression`,
        );
      }
      continue;
    }

    if (entry.status === "A") {
      // New file: exempt from rules 1/2/3/6 by definition (nothing to compare against).
      continue;
    }

    if (entry.status === "M") {
      const p = entry.path;
      if (!isTestFile(p)) continue;
      const baseContent = showFile(base, p);
      const headContent = showFile(head, p);
      comparedCount += 1;
      checkPresentAtBoth(
        p,
        p,
        baseContent,
        headContent,
        base,
        head,
        allowSet,
        violations,
      );
      continue;
    }

    if (entry.status === "R") {
      const { oldPath, newPath } = entry;
      if (!isTestFile(oldPath) && !isTestFile(newPath)) continue;
      if (leavesTestGlob(oldPath, newPath)) {
        violations.push(
          `VIOLATION deleted ${oldPath}: renommé en ${newPath}, hors du périmètre collecté par les tests (vaut suppression)`,
        );
        continue;
      }
      const baseContent = showFile(base, oldPath);
      const headContent = showFile(head, newPath);
      comparedCount += 1;
      checkPresentAtBoth(
        oldPath,
        newPath,
        baseContent,
        headContent,
        base,
        head,
        allowSet,
        violations,
      );
    }
    // C (copy) and other statuses: not covered by the spec, ignored.
  }

  // Rule 4: config files.
  const baseRunners = new Set(rootFiles(base).map(runnerOf).filter(Boolean));
  for (const entry of entries) {
    const paths =
      entry.status === "R" ? [entry.oldPath, entry.newPath] : [entry.path];
    const targetPath = entry.status === "R" ? entry.newPath : entry.path;
    const oldPath = entry.status === "R" ? entry.oldPath : entry.path;

    // A runner config, whatever the status (M, D, R, T, or a second config A), once the base
    // configures that runner: the whole file is pinned.
    const runner = runnerOf(oldPath) || runnerOf(targetPath);
    if (runner && baseRunners.has(runner)) {
      const shown =
        oldPath === targetPath ? targetPath : `${oldPath} -> ${targetPath}`;
      violations.push(
        `VIOLATION config ${shown}: configuration ${runner} présente à la base modifiée (${entry.status}) — toute modification est refusée`,
      );
      continue;
    }

    if (
      entry.status === "D" ||
      (entry.status === "R" &&
        isConfigFile(oldPath) &&
        !isConfigFile(targetPath))
    ) {
      if (isConfigFile(oldPath)) {
        violations.push(
          `VIOLATION config ${oldPath}: fichier de configuration des tests supprimé ou renommé hors de son nom`,
        );
      }
      continue;
    }
    if (!isConfigFile(targetPath)) continue;

    const diffText = diffU0(base, head, paths);
    const added = addedLines(diffText);
    const negativePatterns = [
      "|| true",
      "--passWithNoTests",
      "passWithNoTests: true",
    ];
    for (const line of added) {
      for (const pat of negativePatterns) {
        if (line.includes(pat)) {
          violations.push(
            `VIOLATION config ${targetPath}: ligne ajoutée contient '${pat}'`,
          );
        }
      }
      if (CONTINUE_ON_ERROR_RE.test(line)) {
        violations.push(
          `VIOLATION config ${targetPath}: ligne ajoutée contient 'continue-on-error' (${line.trim()})`,
        );
      }
      if (
        targetPath === "package.json" &&
        (/(^|\s)-x(\s|$)/.test(line) || line.includes("--bail"))
      ) {
        violations.push(
          `VIOLATION config ${targetPath}: option -x/--bail ajoutée dans un script`,
        );
      }
    }

    const baseContent = showFile(base, oldPath);
    const headContent = showFile(head, targetPath);
    if (isRunnerConfig(targetPath)) {
      // Bootstrap: the base configures no such runner (the PR that installs it).
      const headMax = maxRetries(headContent);
      if (headMax > 0) {
        violations.push(
          `VIOLATION config ${targetPath}: retries en hausse (0 -> ${headMax})`,
        );
      }
      continue;
    }
    // Below: what narrows WHICH tests run. Only a file that existed at base has a set to narrow.
    if (baseContent === null) continue;

    if (targetPath === "package.json") {
      for (const name of PINNED_SCRIPTS) {
        const before = scriptValue(baseContent, name, `${base}:package.json`);
        const after = scriptValue(headContent, name, `${head}:package.json`);
        if (before !== undefined && after !== before) {
          violations.push(
            `VIOLATION config package.json: script '${name}' modifié ('${before}' -> '${after ?? "absent"}')`,
          );
        }
      }
    }

    if (isCiDefinition(targetPath)) {
      // A CI definition present at base is pinned whole: what CI runs, when, and on which files.
      violations.push(
        `VIOLATION config ${targetPath}: définition de CI présente à la base modifiée (${entry.status})`,
      );
      if (
        isWorkflow(targetPath) &&
        onBlock(baseContent) !== onBlock(headContent)
      ) {
        violations.push(
          `VIOLATION config ${targetPath}: bloc 'on:' modifié (déclencheurs du workflow)`,
        );
      }
      const removed = removedLines(diffText);
      for (const line of unmatchedLines(added, removed)) {
        if (WORKFLOW_IF_RE.test(line)) {
          violations.push(
            `VIOLATION config ${targetPath}: condition 'if:' ajoutée ou modifiée (${line.trim()})`,
          );
        }
      }
      for (const line of unmatchedLines(removed, added)) {
        if (WORKFLOW_TEST_RUN_RE.test(line)) {
          violations.push(
            `VIOLATION config ${targetPath}: ligne qui lance les tests retirée ou modifiée (${line.trim()})`,
          );
        }
      }
    }
  }

  // Rule 7: the guard itself. CI runs the BASE copy, which refuses any edit of its own file.
  const guardAtBase = showFile(base, GUARD_SELF) !== null;
  for (const entry of entries) {
    const touched =
      entry.status === "R" || entry.status === "C"
        ? [entry.oldPath, entry.newPath]
        : [entry.path];
    if (!touched.includes(GUARD_SELF)) continue;
    if (guardAtBase) {
      violations.push(
        `VIOLATION guard ${GUARD_SELF}: la garde elle-même est modifiée par la PR (${entry.status})`,
      );
    } else {
      process.stderr.write(
        `NOTE: amorçage — ${GUARD_SELF} absent de la base, ajouté par cette PR (relecture humaine, D3)\n`,
      );
    }
  }

  if (violations.length > 0) {
    for (const v of violations) process.stdout.write(`${v}\n`);
    // The written human path (« Changements de CI assumés »): open only when EVERY line is config/guard.
    if (violations.every((v) => HUMAN_PATH_RE.test(v))) {
      process.stderr.write(
        "NOTE: chemin humain : possible — seules des lignes config/guard : recopier chacune dans « Changements de CI assumés » de la PR avec sa justification ; Brice fusionne après lecture\n",
      );
    } else {
      process.stderr.write(
        "NOTE: chemin humain : exclu — un test est supprimé, désactivé, dilué ou compté en baisse : à corriger, jamais fusionné en l’état\n",
      );
    }
    process.exit(1);
  }

  process.stdout.write(
    `OK — test guard: aucune régression de test détectée (${comparedCount} fichiers de test comparés)\n`,
  );
  process.exit(0);
}

function checkPresentAtBoth(
  basePath,
  headPath,
  baseContent,
  headContent,
  base,
  head,
  allowSet,
  violations,
) {
  // Counts ignore comments: a test or a marker inside // or /* */ does not run.
  const bc = stripComments(baseContent || "");
  const hc = stripComments(headContent || "");

  // Rule 3: marker increase — never exempted by allow, applies whenever the file existed at base.
  const baseMarkers = countMatches(bc, MARKER_RE);
  const headMarkers = countMatches(hc, MARKER_RE);
  if (headMarkers > baseMarkers) {
    violations.push(
      `VIOLATION marker ${headPath}: marqueurs .skip/.only/.fixme/.fail/.todo en hausse (${baseMarkers} -> ${headMarkers})`,
    );
  }
  // Rule 3, same family: a `.configure(` call added or changed (retries, serial mode, timeout).
  const configureAdded = unmatchedLines(configureCalls(hc), configureCalls(bc));
  if (configureAdded.length > 0) {
    violations.push(
      `VIOLATION marker ${headPath}: appel .configure( ajouté ou modifié (${configureAdded.join(" ; ")})`,
    );
  }

  // Story tags are read on the raw content: the kit's own convention puts `// @US-N` in a comment.
  const allowed = isAllowed(headContent, allowSet);

  // Rule 2: count.
  if (!allowed) {
    const baseTests = countMatches(bc, TEST_DECL_RE);
    const headTests = countMatches(hc, TEST_DECL_RE);
    const baseExpects = countMatches(bc, EXPECT_RE);
    const headExpects = countMatches(hc, EXPECT_RE);
    if (headTests < baseTests || headExpects < baseExpects) {
      violations.push(
        `VIOLATION count ${headPath}: nombre de tests/expect() en baisse (tests ${baseTests} -> ${headTests}, expect ${baseExpects} -> ${headExpects})`,
      );
    }
  }

  // Rule 6: dilution.
  if (!allowed) {
    const paths = basePath === headPath ? [basePath] : [basePath, headPath];
    const diffText = diffU0(base, head, paths);
    const removed = removedLines(diffText);
    let dilutedLines = 0;
    for (const line of removed) {
      if (
        line.includes("expect(") ||
        CHAIN_MATCHER_RE.test(line) ||
        CLOSING_MATCHER_RE.test(line)
      ) {
        dilutedLines += 1;
      }
    }
    if (dilutedLines > 0) {
      violations.push(
        `VIOLATION dilution ${headPath}: ${dilutedLines} ligne(s) affaiblie(s) (expect/matcher supprimé ou modifié)`,
      );
    }
  }
}

main();
