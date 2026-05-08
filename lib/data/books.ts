/**
 * Three reference publications shown on the home `BooksSection` and the
 * full team page `PublicationsSection` (PR #5).
 *
 * `key` matches `dict.home.books.items.<key>` (and `dict.equipe.publications.items.<key>`)
 * in fr.json/en.json.
 * `accent` controls the stylized cover gradient on `BookCard`.
 * `isbn` is shown on the horizontal variant only; the home variant omits it.
 */
export type BookKey = "thaiPrivateLaw" | "thaiCivilLaw" | "thaiBusinessLaw";

export type Book = {
  key: BookKey;
  accent: "navy" | "gold" | "emerald";
  isbn: string;
};

export const BOOKS: readonly Book[] = [
  { key: "thaiPrivateLaw", accent: "navy", isbn: "978-3-030-56279-3" },
  { key: "thaiCivilLaw", accent: "gold", isbn: "978-90-04-31872-1" },
  { key: "thaiBusinessLaw", accent: "emerald", isbn: "978-981-4581-87-9" },
] as const;
