import type { Metadata } from "next";
import "../globals.css";
import { theme } from "../../lib/theme";
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
    <>
      <Navbar audience="university" />
      <main className="bg-slate-50 text-slate-900 antialiased pt-12">
        {children}
      </main>
    </>
  );
}
