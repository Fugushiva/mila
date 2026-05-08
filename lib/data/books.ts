/**
 * Three reference publications shown in the home `BooksSection`.
 *
 * `key` matches `dict.home.books.items.<key>` in fr.json/en.json.
 * `accent` controls the stylized cover gradient on `BookCard`.
 */
export type BookKey = "thaiPrivateLaw" | "thaiCivilLaw" | "thaiBusinessLaw";

export type Book = {
  key: BookKey;
  accent: "navy" | "gold" | "emerald";
};

export const BOOKS: readonly Book[] = [
  { key: "thaiPrivateLaw", accent: "navy" },
  { key: "thaiCivilLaw", accent: "gold" },
  { key: "thaiBusinessLaw", accent: "emerald" },
] as const;
