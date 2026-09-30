import { formatPrix, type Tarif } from "@/lib/content";

/**
 * DS `PriceTable`: hairline rows, label (+ detail) · dotted leader · price. On a phone a long
 * label (« Microneedling + BBglow + Photothérapie par lumière LED ») wraps inside its row; the
 * price never wraps.
 */
export function PriceTable({ items, note }: { items: Tarif[]; note?: string }) {
  const dense = items.length > 5;
  return (
    <div className="w-full">
      <ul className="border-t border-brun-14">
        {items.map((item, i) => (
          <li
            key={`${i}-${item.label}`}
            className={`flex items-baseline gap-4 border-b border-brun-14 ${dense ? "py-3" : "py-3.5 lg:py-[18px]"}`}
          >
            <span className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-0.5">
              <span className="font-sans text-body font-normal text-brun">
                {item.label}
              </span>
              {item.detail ? (
                <span className="font-sans text-caption text-brun-60">
                  {item.detail}
                </span>
              ) : null}
            </span>
            <span
              aria-hidden="true"
              className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-brun-14"
            />
            <span className="shrink-0 font-sans text-price font-medium whitespace-nowrap text-brun tabular-nums">
              {formatPrix(item.prix)}
            </span>
          </li>
        ))}
      </ul>
      {note ? (
        <p className="mt-[18px] font-sans text-caption text-brun-60">{note}</p>
      ) : null}
    </div>
  );
}
