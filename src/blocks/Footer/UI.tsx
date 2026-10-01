import Link from "next/link";

type NavLink = {
    label: string
    href: string
    id?: string | null
}

type FooterBlockProps = {
    tagline?: string | null
    exploreLinks?: NavLink[] | null
    socialLinks?: NavLink[] | null
    copyrightName?: string | null
    locationText?: string | null
}

const DEFAULT_EXPLORE: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Cocktail Tasting', href: '/cocktail-tasting' },
];

const DEFAULT_SOCIALS: NavLink[] = [
  { label: 'Instagram', href: '/' },
  { label: 'Facebook', href: '/' },
  { label: 'X', href: '/' },
  { label: 'Viber', href: '/' },
];

function LinkColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div className = "flex flex-col gap-4">
        <p className = "eyebrow text-paper/70!">{title}</p>

        <nav className = "flex flex-col gap-3" aria-label = {title}>
            {links.map((link) => (
                <Link
                    key = {link.href + link.label}
                    href = {link.href}
                    className = "w-fit text-sm font-medium text-paper transition-colors duration-150 hover:text-paper/70"
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    </div>
  )
}

export function FooterBlockUI({
    tagline = "Cebu's premium mobile cocktail bar for weddings & events",
    exploreLinks,
    socialLinks,
    copyrightName,
    locationText,
}: FooterBlockProps) {
  const explore = exploreLinks?.length ? exploreLinks : DEFAULT_EXPLORE
  const socials = socialLinks?.length ? socialLinks : DEFAULT_SOCIALS
  const year = new Date().getFullYear()

  return (
    <footer className = "bg-primary pt-16 md:pt-20">
        <div className = "wrap flex flex-col justify-between gap-12 lg:flex-row">
            <div className = "flex flex-col items-start gap-8">
                <div className = "flex items-center gap-5">
                    <img
                        src = "/martini.svg"
                        alt = ""
                        aria-hidden = "true"
                        className = "w-9 shrink-0"
                    />
                    <p className = "display-s max-w-[340px] text-paper!">
                        {tagline}
                    </p>
                </div>

                <Link href = "#inquiry" className = "btn btn-light">
                    Get My Custom Quote
                </Link>
            </div>

            <div className = "flex gap-16 md:gap-24">
                <LinkColumn title = "Explore" links = {explore} />
                <LinkColumn title = "Socials" links = {socials} />
            </div>
        </div>

        <div className = "wrap mt-14 md:mt-20">
            <img 
                src = "/logoLarge.svg"
                alt = ""
                aria-hidden = "true"
                className = "w-full h-auto object-contain"
            />
        </div>

        <div className = "wrap mt-10">
            <div className = "flex flex-col justify-between gap-2 border-t border-paper/25 pt-5 pb-8 md:flex-row">
                <p className = "meta text-paper/75!">© {copyrightName}, {year}</p>
                <p className = "meta text-paper/75!">{locationText}</p>
            </div>
        </div>
    </footer>
  )
}
