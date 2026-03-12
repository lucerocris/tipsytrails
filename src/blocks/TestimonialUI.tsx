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
    <div className = "py-14 md:py-20 px-4 md:px-8">
      <div className = "flex flex-col max-w-7xl mx-auto gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-sm lg:text-base">{eyebrow}</p>
          <h2 className = "flex flex-col gap-1 text-2xl md:text-4xl lg:text-5xl font-medium">
            {headingLine1}
            {headingLine2 && (
              <span>{headingLine2}</span>
            )}
          </h2>
        </div>
        
        <TestimonialCarousel testimonial={testimonials} baseUrl={SERVER_URL} />
      </div>
    </div>
  )
}