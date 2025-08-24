import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    /* Header */
    <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            suppressHydrationWarning={true}
          ></div>
          <Link
            href="/"
            className="flex items-center gap-3 hover:text-slate-900"
          >
            <div className="relative h-10 w-56 overflow-hidden">
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
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition">
            Features
          </a>
          <a href="#roi" className="hover:text-slate-900 transition">
            ROI Calculator
          </a>
          <a href="#testimonials" className="hover:text-slate-900 transition">
            Case Studies
          </a>
          <a href="#pricing" className="hover:text-slate-900 transition">
            Pricing
          </a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Request Demo
          </button>
        </nav>
      </div>
    </header>
  );
}
