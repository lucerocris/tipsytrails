import { Button } from '@/app/(frontend)/components/Button';
import { playfair } from '@/app/(frontend)/fonts';
import Image from 'next/image'

type HeroProps = {
  heading: string;
  headingHighlight?: string;
  description?: string;
  backgroundImage?: any;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export const HeroBlockUI = ({
  heading,
  headingHighlight,
  description,
  backgroundImage,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink
}: HeroProps) => {

  const bgUrl = typeof backgroundImage === 'object' && backgroundImage?.url 
    ? backgroundImage.url 
    : '/placeholder.png'; 


  return (
    <div className="relative h-screen w-full overflow-hidden text-foreground px-4 md:px-8 lg:px-24 py-16 flex justify-center">
      
      {/* The Background Image */}
      <Image
        src={bgUrl}
        alt={typeof backgroundImage === 'object' ? backgroundImage?.alt || 'Hero background' : 'Hero background'}
        fill
        unoptimized
        priority
        className="object-cover -z-10" 
        sizes="100vw"
      />

      {/* The Content Overlay */}
      <div className="relative z-10 flex h-full w-full items-end max-w-7xl">
        <div className="flex h-auto flex-col gap-1 lg:gap-3">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3.5">
              
              <h1
                className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-semibold flex flex-col gap-2 text-black`}
              >
                {heading} {headingHighlight && <span className="text-primary!">{headingHighlight}</span>}
              </h1>
              
              {description && (
                <p className="text-md lg:text-lg text-black max-w-lg">
                  {description}
                </p>
              )}
            </div>

            <div className="flex flex-row gap-3">
              {primaryButtonText && primaryButtonLink && (
                <Button href={primaryButtonLink} className="flex-1 w-full text-center">
                  {primaryButtonText}
                </Button>
              )}
              
              {secondaryButtonText && secondaryButtonLink && (
                <Button href={secondaryButtonLink} variant="skeleton" className="flex-1 w-full text-center">
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}