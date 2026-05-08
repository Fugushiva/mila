import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { BOOKS } from "@/lib/data/books";
import { BookCard } from "@/components/sections/BookCard";

type Props = { locale: Locale };

export function PublicationsSection({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={dict.team.publications.eyebrow}
          title={dict.team.publications.title}
          intro={dict.team.publications.intro}
          as="h2"
          align="center"
        />
        <div className="mt-14 flex flex-col gap-8">
          {BOOKS.map((b) => {
            const book = dict.team.publications.items[b.key];
            return (
              <BookCard
                key={b.key}
                variant="horizontal"
                accent={b.accent}
                title={book.title}
                publisher={book.publisher}
                year={book.year}
                description={book.description}
                isbn={b.isbn}
                isbnLabel={dict.team.publications.isbnLabel}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
