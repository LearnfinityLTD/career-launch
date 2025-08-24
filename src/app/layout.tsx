import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

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
        <Navbar audience="student" />

        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
