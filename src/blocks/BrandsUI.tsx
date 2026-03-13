import { BrandCarousel } from "@/app/(frontend)/components/BrandCarousel"

type BrandsBlockProps = {
  heading: string
}

export function BrandsBlockUI({
  heading
}: BrandsBlockProps) {
  return (
    <div className = "py-14 lg:py-20 pt-24 lg:pt-30 px-4 md:px-8">
      <div className = "size-full flex flex-col justify-center gap-4 max-w-7xl mx-auto">
        <h4 className = "font-medium text-2xl text-black text-center">
          {heading}
        </h4>
        
        <div className="w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <BrandCarousel />
        </div>
      </div>
    </div>
  )
}