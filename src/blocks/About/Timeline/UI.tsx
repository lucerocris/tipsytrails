import InteractiveTimeline, { type TimelineEntry } from "@/app/(frontend)/components/InteractiveTimeline";
import { SERVER_URL } from "@/utilities/url";

type RawEntry = {
    id?: string | null
    dateLabel: string
    description: string
    image: {
        url?: string | null
        alt?: string | null
    } | number
}

type TimelineBlockProps = {
    entries?: RawEntry[]
}

function resolveImageUrl(image: RawEntry['image']): string {
    if (typeof image === 'number' || !image) return '/placeholder.png'
    if (!image.url) return '/placeholder.png'
    return image.url.startsWith('http') ? image.url : `${SERVER_URL}${image.url}`
}

function ResolveImageAlt(image: RawEntry['image']): string {
    if (typeof image === 'number' || !image) return '';
    return image.alt ?? ''
}

export function TimelineBlockUI({
    entries = []
}: TimelineBlockProps) {
    if (!entries.length) return null;

    const shaped: TimelineEntry[] = entries.map((e) => ({
        id: e.id,
        dateLabel: e.dateLabel,
        description: e.description,
        imageUrl: resolveImageUrl(e.image),
        imageAlt: ResolveImageAlt(e.image)
    }));

    return (
        <div>
            <InteractiveTimeline entries = {shaped} />
        </div>
    )
}