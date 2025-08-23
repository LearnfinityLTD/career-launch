"use client";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Rocket,
  Briefcase,
  GraduationCap,
  Sparkles,
  Clock,
  Trophy,
  Star,
} from "lucide-react";

const roadmaps = [
  {
    slug: "frontend",
    title: "Frontend Developer",
    tags: ["React", "TypeScript", "A11y"],
  },
  {
    slug: "backend",
    title: "Backend Developer",
    tags: ["APIs", "Databases", "Auth"],
  },
  {
    slug: "devops",
    title: "DevOps Engineer",
    tags: ["Docker", "K8s", "CI/CD"],
  },
  {
    slug: "datascience",
    title: "Data Scientist",
    tags: ["Pandas", "ML", "MLOps"],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero — student outcomes */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Rocket className="h-4 w-4" />
          CareerLaunch • Land your first tech role faster
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
          Go from{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            graduate
          </span>{" "}
          to hired—with a guided roadmap and real projects
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          Pick a track, follow weekly checkpoints, build a portfolio employers
          trust, and practice interviews until you’re offer-ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/roadmap/frontend"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2 shadow-lg"
          >
            Start free roadmap
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/skills-check"
            className="border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-slate-400 transition"
          >
            Take 5-min skills check
          </Link>
        </div>

        {/* Student social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500 mt-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            1,200+ grads using CareerLaunch paths
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            300+ real project submissions reviewed
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            Avg time to first offer: 10–16 weeks
          </div>
        </div>
      </section>

      {/* Roadmap Grid — each card is a Link */}
      <section id="roadmaps" className="max-w-7xl mx-auto px-6 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
          Choose your path
        </h2>
        <p className="text-slate-600 text-center mb-8">
          Four employer-aligned tracks with weekly tasks, portfolio projects,
          and interview prep.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roadmaps.map((rm) => (
            <Link
              key={rm.slug}
              href={`/roadmap/${rm.slug}`}
              className="group rounded-2xl bg-white p-6 border border-slate-200 shadow hover:shadow-xl hover:border-blue-200 transition transform hover:-translate-y-0.5"
            >
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                {rm.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Curated checkpoints, projects, and interview drills.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {rm.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 inline-flex items-center gap-2 font-medium text-blue-600">
                View roadmap
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3-step how it works */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <GraduationCap className="h-6 w-6" />,
                title: "Follow weekly checkpoints",
                text: "Short, focused tasks that build real skills and momentum.",
              },
              {
                icon: <Briefcase className="h-6 w-6" />,
                title: "Ship portfolio projects",
                text: "Employer-credible builds with clear acceptance criteria.",
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "Practice interviews",
                text: "Role-specific drills and mocks to convert to offers.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow"
              >
                <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Student stories
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The weekly tasks and review notes made it easy to keep going. I landed a junior frontend role in 12 weeks.",
                name: "Aisha K.",
                role: "Junior Frontend Developer",
              },
              {
                quote:
                  "The backend roadmap forced me to build real APIs with tests. My interview code challenge felt familiar.",
                name: "Daniel M.",
                role: "Backend Engineer",
              },
              {
                quote:
                  "Mock interviews were a game changer. I knew exactly how to structure answers and talk about projects.",
                name: "Rhea P.",
                role: "DevOps Intern",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow"
              >
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-700 italic">“{t.quote}”</p>
                <div className="mt-4 border-t pt-3 text-sm">
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-slate-600">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Start your first week today
          </h3>
          <p className="text-lg text-blue-100 mb-6">
            Pick a roadmap, complete your first checkpoint, and push your first
            portfolio commit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/roadmap/frontend"
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2 shadow-lg"
            >
              Start free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Quiet buyer link */}
      <footer className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-slate-500">
        Are you a university?{" "}
        <Link href="/universities" className="text-blue-700 hover:underline">
          See our institutional offering →
        </Link>
      </footer>
    </div>
  );
}
