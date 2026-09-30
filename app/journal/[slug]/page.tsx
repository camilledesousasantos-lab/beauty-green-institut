import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { MarkdownBody } from "@/components/markdown";
import { Photo } from "@/components/photo";
import { SectionLabel } from "@/components/section-label";
import { getSite } from "@/lib/content";
import { formatDateFr, getArticle, getArticles } from "@/lib/journal";

type Props = { params: Promise<{ slug: string }> };

// Only published articles get a page (drafts too in the suite's build, E2E_DRAFTS=1).
export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.chapo };
}

/** `ArticlePage` of the mock. */
export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const site = getSite();
  const related = getArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <section className="pt-9 lg:pt-24">
        <Container narrow>
          <SectionLabel className="mb-4 lg:mb-5">
            {article.category} · {formatDateFr(article.date)}
          </SectionLabel>
          <h1 className="text-[34px] leading-[1.1] lg:max-w-[18ch] lg:text-[50px]">
            {article.title}
          </h1>
          <p className="mt-5 max-w-[60ch] font-serif text-lede-m font-medium text-brun-80 lg:mt-[26px] lg:text-lede">
            {article.chapo}
          </p>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <Photo
            src={article.image}
            ratio="16 / 9"
            sizes="(min-width: 1280px) 1120px, 100vw"
            objectPosition="center 40%"
            preload
          />
        </Container>
      </section>

      <section className="pb-14 lg:pt-10 lg:pb-16">
        <Container narrow>
          <MarkdownBody>{article.body}</MarkdownBody>
          <aside className="mt-14 flex max-w-[740px] flex-col gap-6 bg-beige px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-11 lg:py-10">
            <div>
              <h2 className="text-[25px] leading-[1.2] font-medium lg:text-[28px]">
                En parler en rendez-vous
              </h2>
              <p className="mt-2.5 max-w-[34ch] font-sans text-body-sm text-brun-80">
                Réservation en ligne sur Planity, à l'institut,{" "}
                {site.adresse.rue} à {site.adresse.ville}.
              </p>
            </div>
            <Button href={site.planity} external>
              Prendre rendez-vous
            </Button>
          </aside>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="bg-blanc-casse py-14 lg:py-28">
          <Container>
            <SectionLabel className="mb-8">Articles liés</SectionLabel>
            <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((a) => (
                <li key={a.slug}>
                  <ArticleCard
                    href={a.href}
                    title={a.title}
                    category={a.category}
                    date={formatDateFr(a.date)}
                    image={a.image}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
