import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { BOOKS } from "@/lib/data/books";
import { BookCard } from "@/components/sections/BookCard";

type Props = { locale: Locale };

export function BooksSection({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={dict.home.books.eyebrow}
          title={dict.home.books.title}
          intro={dict.home.books.intro}
          as="h2"
          align="center"
        />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {BOOKS.map((book) => (
            <BookCard
              key={book.key}
              accent={book.accent}
              title={dict.home.books.items[book.key].title}
              publisher={dict.home.books.items[book.key].publisher}
              year={dict.home.books.items[book.key].year}
              description={dict.home.books.items[book.key].description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
