"use client";
// Client component: the selected category of the Journal filter.

import { useState } from "react";
import { ArticleCard } from "./article-card";

export interface JournalItem {
  href: string;
  title: string;
  category: string;
  /** Already formatted in French. */
  date: string;
  image: string;
}

/** The Journal list with its category pills (`JournalPage` of the mock). */
export function JournalFilter({
  articles,
  categories,
}: {
  articles: JournalItem[];
  categories: string[];
}) {
  const [filter, setFilter] = useState("Tous");
  const list = articles.filter(
    (a) => filter === "Tous" || a.category === filter,
  );

  return (
    <>
      <div className="flex flex-wrap gap-2.5 border-b border-brun-14 pb-7">
        {["Tous", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`min-h-10 rounded-full border px-5 py-2.5 font-sans text-[12px] tracking-[0.06em] ${
              filter === c
                ? "border-brun bg-brun text-ecru"
                : "border-brun-14 bg-transparent text-brun-80 hover:border-brun-30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      {list.length > 0 ? (
        <ul className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-y-16">
          {list.map((a) => (
            <li key={a.href}>
              <ArticleCard {...a} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-14 font-serif font-medium italic text-brun-60">
          Aucun article dans cet univers pour le moment.
        </p>
      )}
    </>
  );
}
