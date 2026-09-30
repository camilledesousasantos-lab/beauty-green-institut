import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaFinal } from "@/components/cta-final";
import { JournalFilter } from "@/components/journal-filter";
import { SectionLabel } from "@/components/section-label";
import { getPage } from "@/lib/content";
import { formatDateFr, getArticles } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Le Journal de Beauty Green Institut : comprendre les soins, avant et après — électrolyse, soins visage, cils, sourcils, blanchiment dentaire.",
};

/** `JournalPage` of the mock. At launch no article is published: the empty state shows. */
export default function JournalPage() {
  const page = getPage("journal");
  const articles = getArticles().map((a) => ({
    href: a.href,
    title: a.title,
    category: a.category,
    date: formatDateFr(a.date),
    image: a.image,
  }));

  return (
    <>
      <section className="pt-9 lg:pt-28">
        <Container>
          <SectionLabel className="mb-4 lg:mb-6">Journal</SectionLabel>
          <h1 className="text-h1-m lg:max-w-[16ch] lg:text-h1">{page.titre}</h1>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          {articles.length > 0 ? (
            <JournalFilter articles={articles} categories={page.categories} />
          ) : (
            <p className="max-w-[40ch] border-t border-brun-14 pt-10 font-serif text-[23px] leading-[1.45] font-medium italic text-brun-60 lg:pt-14 lg:text-[28px]">
              {page.vide}
            </p>
          )}
        </Container>
      </section>

      <CtaFinal
        title="Une question ? Parlons-en au rendez-vous"
        line="Les articles du Journal complètent, mais ne remplacent pas, le bilan en cabine."
      />
    </>
  );
}
