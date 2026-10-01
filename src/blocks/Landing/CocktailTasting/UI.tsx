import Image from "next/image";
import { Button } from "@/app/(frontend)/components/Button";

type CocktailTastingProps = {
  eyebrow: string
  heading: string
  backgroundImage?: any
  buttonText?: string | null
  buttonLink?: string | null
}

export function CocktailTastingBlockUI({
  eyebrow,
  heading,
  backgroundImage,
  buttonText,
  buttonLink,
}: CocktailTastingProps) {
  const bgUrl = typeof backgroundImage === 'object' && backgroundImage?.url
    ? backgroundImage.url
    : '/placeholder.png';
  
  const bgAlt = typeof backgroundImage === 'object' ? backgroundImage?.alt || '' : ''
  
  return (
    <section>
      <div className = "wrap">
        {/* Text sits on the brand panel, never on the photo, so any image stays legible */}
        <div className = "reveal grid overflow-hidden rounded-m bg-primary md:grid-cols-2">
          <div className = "flex flex-col items-start justify-center gap-5 p-8 md:p-12 lg:p-16">
            <p className = "eyebrow text-paper/80!">{eyebrow}</p>
            <h2 className = "display-l text-paper!">{heading}</h2>
            
            {buttonText && buttonLink && (
              <Button href={buttonLink} variant="light" className="mt-3 w-fit">{buttonText}</Button>
            )}
          </div>

          <div className = "relative aspect-[4/3] md:aspect-auto md:min-h-[460px]">
            <Image
              src={bgUrl}
              alt={bgAlt}
              fill
              className="object-cover"
              sizes = "(max-width: 768px) 100vw, 620px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
