import type { Metadata } from "next";
import "../globals.css";
import { theme } from "../../lib/theme";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: `${theme.universityName} – CareerLaunch`,
  description: `CareerLaunch helps ${theme.universityName} graduates transition smoothly into careers with roadmaps and analytics.`,
};

export default function UniversitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        {/* Header */}
        <Navbar audience="university" />
        <main>{children}</main>
      </body>
    </html>
  );
}
