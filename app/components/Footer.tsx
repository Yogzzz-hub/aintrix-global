import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Research", href: "/research" },
  { label: "Internships", href: "/internships" },
  { label: "Careers", href: "/careers" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary-bg">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-lg font-semibold tracking-tight text-primary-text">
              Aintrix Global
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-secondary-text max-w-xs">
              Shaping the future through innovation, research, and strategic global partnerships.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-1">
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-secondary-text mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-text transition-colors duration-200 hover:text-primary-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-1">
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-secondary-text mb-6">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-text transition-colors duration-200 hover:text-primary-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-secondary-text mb-6">
              Contact
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-secondary-text">
              <li>hello@aintrixglobal.com</li>
              <li>Bangalore, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-text">
            &copy; {new Date().getFullYear()} Aintrix Global Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-secondary-text transition-colors duration-200 hover:text-primary-text"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
