import { TestimonialCarousel } from "@/app/(frontend)/components/TestimonialCarousel";
import type { Testimonial } from "@/payload-types";

type TestimonialBlockProps = {
  eyebrow: string
  headingLine1: string
  headingLine2?: string | null
  testimonials?: Testimonial[]
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000';

export function TestimonialBlockUI({
  eyebrow,
  headingLine1,
  headingLine2,
  testimonials = [],
}: TestimonialBlockProps) {
  if (!testimonials.length) return null;
  
  return (
    <section className = "section bg-paper-2">
      <div className = "wrap flex flex-col gap-10 md:gap-14">
        <div className="reveal flex flex-col gap-4">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className = "display-l">
            {headingLine1}
            {headingLine2 && (
              <span className="block text-ink-50">{headingLine2}</span>
            )}
          </h2>
        </div>
        
        <TestimonialCarousel testimonial={testimonials} baseUrl={SERVER_URL} />
      </div>
    </section>
  )
}
