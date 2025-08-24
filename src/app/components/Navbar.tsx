import Link from "next/link";
import Image from "next/image";

type NavbarProps = {
  audience: "student" | "university";
};

export default function Navbar({ audience }: NavbarProps) {
  return (
    <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-48 overflow-hidden">
            <Image
              src="/logo.svg"
              alt="CareerLaunch logo"
              fill
              className="object-contain object-left"
              priority
              style={{
                transform: "scale(5) translateY(1px)",
                transformOrigin: "left center",
              }}
            />
          </div>
        </Link>

        {/* Nav */}
        {audience === "university" ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
            <Link href="/roi" className="hover:text-slate-900">
              ROI Calculator
            </Link>
            <a href="#case-studies" className="hover:text-slate-900">
              Case Studies
            </a>
            <a href="#pricing" className="hover:text-slate-900">
              Pricing
            </a>
            <Link
              href="/demo"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Request Demo
            </Link>
          </nav>
        ) : (
          <nav className="text-sm text-slate-600 flex gap-6">
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <Link href="/skills-check" className="hover:text-slate-900">
              Skills Check
            </Link>
            <Link href="/#roadmaps" className="hover:text-slate-900">
              Roadmaps
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
