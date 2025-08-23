import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CareerLaunch | CS Graduate Career Roadmaps",
  description:
    "A lightweight roadmap tracker for CS graduates transitioning to industry careers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-brand-600" />
              <Link href="/" className="hover:text-slate-900">
                <span className="font-semibold tracking-tight">
                  CareerLaunch
                </span>
              </Link>
            </div>
            <nav className="text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
