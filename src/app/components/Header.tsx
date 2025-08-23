import { GraduationCap } from "lucide-react";

export default function Header() {
  return (
    /* Header */
    <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center"
            suppressHydrationWarning={true}
          >
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900">CareerLaunch</span>
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
