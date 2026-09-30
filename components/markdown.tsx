import Image from "next/image";
import Markdown from "react-markdown";

/**
 * Markdown written by Camille in Pages CMS (legal pages, Journal articles), rendered with the
 * article typography of the mock (`ArticlePage`). react-markdown drops raw HTML and unsafe
 * link protocols by default — keep it that way (no rehype-raw). Images are limited to the
 * site's own `/images/` folder.
 */
export function MarkdownBody({ children }: { children: string }) {
  return (
    <div className="grid max-w-[65ch] gap-6">
      <Markdown
        components={{
          h2: ({ children }) => (
            <h2 className="mt-4 text-[27px] leading-[1.2] font-medium lg:text-[33px]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-2 text-[22px] leading-[1.25] font-medium lg:text-[25px]">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="font-sans text-[16px] leading-[1.75] text-brun-80 lg:text-[17px]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="grid list-disc gap-2 pl-5 font-sans text-[16px] leading-[1.75] text-brun-80 marker:text-vert lg:text-[17px]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="grid list-decimal gap-2 pl-5 font-sans text-[16px] leading-[1.75] text-brun-80 marker:text-vert lg:text-[17px]">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-5 border-l border-vert-40 pl-7 font-serif text-[21px] leading-[1.55] font-medium italic text-brun lg:text-[24px] [&_p]:font-serif [&_p]:text-[length:inherit] [&_p]:leading-[inherit] [&_p]:text-brun">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-medium text-brun">{children}</strong>
          ),
          a: ({ href, children }) => {
            const external =
              typeof href === "string" && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                className="text-brun underline underline-offset-4 hover:text-vert"
                {...(external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt }) =>
            typeof src === "string" && src.startsWith("/images/") ? (
              <span className="relative block aspect-[3/2] w-full overflow-hidden bg-beige">
                <Image
                  src={src}
                  alt={alt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 740px, 100vw"
                  className="object-cover"
                />
              </span>
            ) : null,
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
