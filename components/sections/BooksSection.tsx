import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldOrnament } from "@/components/motion/GoldOrnament";
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/motion/MotionReveal";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { BOOKS } from "@/lib/data/books";
import { BookCard } from "@/components/sections/BookCard";

type Props = { locale: Locale };

export function BooksSection({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28">
      {/* Soft navy halo top-left for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-3xl"
      />
      <Container className="relative">
        <MotionReveal>
          <SectionHeading
            eyebrow={dict.home.books.eyebrow}
            title={dict.home.books.title}
            intro={dict.home.books.intro}
            as="h2"
            align="center"
          />
        </MotionReveal>
        <div className="mt-6 flex justify-center">
          <GoldOrnament variant="compact" />
        </div>
        <MotionStagger
          stagger={0.12}
          className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {BOOKS.map((book) => (
            <MotionStaggerItem key={book.key}>
              <BookCard
                accent={book.accent}
                title={dict.home.books.items[book.key].title}
                publisher={dict.home.books.items[book.key].publisher}
                year={dict.home.books.items[book.key].year}
                description={dict.home.books.items[book.key].description}
              />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}
