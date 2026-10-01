type DrinkCardProps = {
  name: string
  imageUrl: string
  index: number
}

// The photo carries the color. The card itself is only a frame and a label.
export function DrinkCard({ name, imageUrl, index }: DrinkCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-s bg-paper-3">
        <img src={imageUrl} alt={name} loading="lazy" className="size-full object-cover" />
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-[22px] leading-tight text-ink">{name}</p>
        <span className="meta">{String(index + 1).padStart(2, '0')}</span>
      </div>
    </div>
  )
}
