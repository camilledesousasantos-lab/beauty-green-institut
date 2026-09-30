/** DS `PrecautionsBlock`: the beige block of contraindications, always visible before booking. */
export function PrecautionsBlock({
  intro,
  items,
  footnote,
}: {
  intro?: string;
  items: string[];
  footnote?: string;
}) {
  return (
    <section
      aria-labelledby="precautions"
      className="bg-beige px-5 py-9 lg:px-14 lg:py-12"
    >
      <h3
        id="precautions"
        className={`text-h3-m font-medium lg:text-h3 ${intro ? "mb-4" : "mb-6"}`}
      >
        Précautions et contre-indications
      </h3>
      {intro ? (
        <p className="mb-6 max-w-[58ch] font-sans text-body text-brun-80">
          {intro}
        </p>
      ) : null}
      <ul className="grid max-w-[62ch] gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3.5 font-sans text-body-sm leading-[1.6] text-brun-80"
          >
            <span
              aria-hidden="true"
              className="mt-[11px] w-[18px] flex-none border-t border-vert"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {footnote ? (
        <p className="mt-7 max-w-[58ch] font-serif text-body font-medium italic text-brun">
          {footnote}
        </p>
      ) : null}
    </section>
  );
}
