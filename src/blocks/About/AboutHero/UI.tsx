import Image from "next/image";
import { parrisienne } from "@/app/(frontend)/fonts";

type AboutHeroProps = {
    heading: string
    headingScript: string
    backgroundImage: any
}

export function AboutHeroUI({
    heading,
    headingScript,
    backgroundImage,
}: AboutHeroProps) {
    const bgUrl = typeof backgroundImage === 'object' && backgroundImage?.url
        ? backgroundImage.url
        : '/placeholder.png';

    const bgAlt = typeof backgroundImage === 'object' ? backgroundImage?.alt || '' : '';

    return (
        <div className = "relative min-h-screen md:h-[80vh] lg:h-screen w-full overflow-hidden text-foreground px-6 py-20 md:px-12 lg:px-24 pt-32 flex justify-center">
            <Image 
                src = {bgUrl}
                alt = {bgAlt}
                fill
                unoptimized
                priority
                className = "object-cover -z-10"
                sizes = "100vw"
            />

            <div className = "relative z-10 flex h-full w-full max-w-7xl">
                <div className = "flex h-auto flex-col items-start text-left">
                    <h1 className = "text-4xl md:text-5xl lg:text-6xl font-semibold flex flex-col text-black leading-[0.8]">
                        {heading}
                        <span
                            className = {`
                                ${parrisienne.className}
                                text-primary
                                text-6xl md:text-7xl lg:text-8xl
                                leading-none
                                -mt-2 md:-mt-4 lg:-mt-6 ml-2    
                            `}
                        >
                            {headingScript}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}