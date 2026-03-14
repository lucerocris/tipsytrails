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
    <div className = "py-14 md:py-2 px-4 md:px-8">
      <div className = "relative flex flex-col gap-6 justify-center items-center bg-cover bg-center bg-no-repeat h-[65vh] rounded-sm w-full max-w-7xl mx-auto overflow-hidden">
        <Image
          src={bgUrl}
          alt={bgAlt}
          fill
          className="object-cover -z-10"
          sizes = "(max-width: 1400px) 100vw, 1400px"
        />
        
        <div className = "relative z-10 flex flex-col gap-2 text-center text-black px-4">
          <p className="text-sm lg:text-base tracking-widest uppercase">{eyebrow}</p>
          <h2 className="flex flex-col gap-1 text-2xl md:text-4xl lg:text-5xl font-medium max-w-xl">{heading}</h2>
        </div>
        
        {buttonText && buttonLink && (
          <Button href={buttonLink}>{buttonText}</Button>
        )}
      </div>
    </div>
  )
}