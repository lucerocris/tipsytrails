import Link from "next/link";

export default function Footer() {
  const containerStyles = "max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-20";

  return (
    <footer className="bg-primary flex flex-col pt-14 lg:pt-10">
      
      {/* Top content */}
      <div className={`flex flex-col lg:flex-row justify-between gap-12 lg:gap-0 ${containerStyles}`}>
        
        {/* Martini + Tagline Row — Aligned to start to match link headers */}
        <div className = "flex flex-row items-start">
          <div className="flex flex-row items-center gap-6">
            <div className="w-[35px] md:w-[45px] opacity-90 flex-shrink-0"> 
              <img
                src="/martini.svg"
                alt="Tipsy Trails logo"
                className="w-full h-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/80 text-sm font-light leading-relaxed max-w-[220px] pt-1">
              Cebu's premium mobile cocktail bar for weddings &amp; events.
            </p>
          </div>
        </div>


        {/* Link columns */}
        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-3">
            {/* These headers now align with the top of the martini glass */}
            <p className="text-white/40 text-sm font-bold tracking-widest uppercase">
              Explore
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Menu', href: '/menu' },
                { label: 'Cocktail Tasting', href: '/cocktail-tasting' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white text-base font-medium transition-colors duration-200 hover:text-white/60 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white/40 text-sm font-bold tracking-widest uppercase">
              Socials
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Instagram', href: '/' },
                { label: 'Facebook', href: '/' },
                { label: 'X', href: '/' },
                { label: 'Viber', href: '/' },
              ].map((link) => (
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

      {/* Wordmark */}
      <div className={`${containerStyles} mt-8 lg:mt-12`}>
        <img
          src="/logoLarge.svg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-contain object-left lg:object-center" 
        />
      </div>

      {/* Bottom bar */}
      <div className={`${containerStyles} pt-8`}>
        <div className="border-t border-white/20" />
      </div>

      {/* Footer Meta */}
      <div className={`flex flex-col md:flex-row justify-between pt-4 pb-8 ${containerStyles}`}>
        <p className="text-white/40 text-xs tracking-tight">© Tipsy Trails, 2026</p>
        <p className="text-white/40 text-xs tracking-tight uppercase">Based in Cebu, Philippines</p>
      </div>

    </footer>
  );
}