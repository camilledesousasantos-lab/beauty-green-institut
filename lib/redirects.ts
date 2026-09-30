// Imported by next.config.ts (outside the bundler): no alias imports here.
// /prestations is a real route, not a redirect.
export const legacyRedirects = [
  { source: "/reservations", destination: "/prestations", permanent: true },
  {
    source: "/ch-ques-cadeaux",
    destination: "/cheques-cadeaux",
    permanent: true,
  },
  { source: "/chou2", destination: "/", permanent: true },
  { source: "/photographies-1", destination: "/institut", permanent: true },
];
