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

export function FooterBlockUI({
    tagline = "Cebu's premium mobile cocktail bar for weddings & events",
    exploreLinks,
    socialLinks,
    copyrightName,
    locationText,
}: FooterBlockProps) {
  const containerStyles = 'max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-20'
  const explore = exploreLinks?.length ? exploreLinks : DEFAULT_EXPLORE
  const socials = socialLinks?.length ? socialLinks : DEFAULT_SOCIALS
  const year = new Date().getFullYear()

  return (
    <footer className = "bg-primary flex flex-col pt-14 lg:pt-10">
        <div className = {`flex flex-col lg:flex-row justify-between gap-12 lg:gap-0 ${containerStyles}`}>
            <div className = "flex flex-row items-start">
                <div className = "flex flex-row items-center gap-6">
                    <div className = "w-[35px] md:w-[45px] opacity-90 shrink-0">
                        <img 
                            src = "/martini.svg"
                            alt = "Tipsy Trails Martini Logo"
                            className = "w-full h-auto object-contain brightness-0 invert"
                        />
                    </div>
                    <p className = "text-white/80 text-sm font-light leading-relaxed max-w-[220px] pt-1">
                        {tagline}
                    </p>
                </div>
            </div>

            <div className = "flex gap-16 md:gap24">
                <div className = "flex flex-col gap-3">
                    <p className = "text-white/40 text-sm font-bold tracking-widest uppercase">
                        Explore
                    </p>

                    <nav className = "flex flex-col gap-3">
                        {explore.map((link) => (
                            <Link
                                key = {link.href + link.label}
                                href = {link.href}
                                className = "text-white text-base font-medium transition-colors duration-200 hover:text-white/60 w-fit"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className = "flex flex-col gap-3">
                    <p className = "text-white/40 text-sm font-bold tracking-widest uppercase">
                        Socials
                    </p>

                    <nav className = "flex flex-col gap-3">
                        {socials.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-white text-base font-medium transition-colors duration-200 hover:text-white/60 w-fit"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

            </div>
        </div>

        <div className = {`${containerStyles} mt-8 lg:mt-12`}>
            <img 
                src = "/logoLarge.svg"
                alt = ""
                aria-hidden = "true"
                className = "w-full h-auto object-contain object-left lg:object-center"
            />
        </div>

        <div className = {`${containerStyles} pt-8`}>
            <div className = "border-t border-white/50" />
        </div>

        <div className = {`flex flex-col md:flex-row justify-between pt-4 pb-8 ${containerStyles}`}>
            <p className = "text-white/40 text-xs tracking-tight">© {copyrightName}, {year}</p>
            <p className = "text-white/40 text-xs tracking-tight uppercase">{locationText}</p>
        </div>
    </footer>
  )
}