import { formatDateFr } from "@/lib/journal";
import { Container } from "./container";
import { MarkdownBody } from "./markdown";
import { SectionLabel } from "./section-label";

/** Shared layout of the two legal pages (text from `content/legal/*.md`, edited in Pages CMS). */
export function LegalPage({
  title,
  updated,
  body,
}: {
  title: string;
  updated: string;
  body: string;
}) {
  return (
    <section className="pt-9 pb-16 lg:pt-28 lg:pb-28">
      <Container narrow>
        <SectionLabel className="mb-4 lg:mb-6">
          Informations légales
        </SectionLabel>
        <h1 className="text-h1-m lg:text-h1">{title}</h1>
        <p className="mt-4 mb-10 font-sans text-caption text-brun-60 lg:mb-14">
          Mise à jour le {formatDateFr(updated)}
        </p>
        <MarkdownBody>{body}</MarkdownBody>
      </Container>
    </section>
  );
}
