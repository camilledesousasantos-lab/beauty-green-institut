import type { ReactNode } from "react";

/** The mock's `Container`: 1280 px wide with an 80 px gutter at 1440, 20 px on a phone. */
export function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  /** 900 px column of the article page. */
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 md:px-10 lg:px-20 ${narrow ? "max-w-[900px]" : "max-w-[1280px]"} ${className}`}
    >
      {children}
    </div>
  );
}
