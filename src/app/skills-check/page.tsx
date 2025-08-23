"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  CircleHelp,
  Target,
  Trophy,
  RefreshCw,
  ShieldCheck,
  Gauge,
  FileCheck2,
} from "lucide-react";

/**
 * CareerLaunch Skills Check (Student‑First)
 * - Single file, drop‑in for /app/skills-check/page.tsx (Next.js App Router)
 * - No API calls; client-only scoring & persistence (localStorage)
 * - A11y friendly: labels, roles, keyboard focus management
 * - Design matches student-first homepage (gradients, rounded-2xl, subtle animations)
 */

// --- Types ---
type Option = { value: string; label: string; weight?: number };
type Question = {
  id: string;
  title: string;
  help?: string;
  trackWeights: Partial<Record<TrackKey, number>>; // how much this Q leans to each track
  options: Option[]; // Likert or multi-choice; score inferred by index unless weight provided
};

// The four tracks we already expose site-wide
const TRACKS = [
  { key: "frontend", label: "Frontend Developer", href: "/roadmap/frontend" },
  { key: "backend", label: "Backend Developer", href: "/roadmap/backend" },
  { key: "devops", label: "DevOps Engineer", href: "/roadmap/devops" },
  { key: "datascience", label: "Data Scientist", href: "/roadmap/datascience" },
] as const;

type TrackKey = (typeof TRACKS)[number]["key"]; // "frontend" | "backend" | "devops" | "datascience"

type Answers = Record<string, number>; // questionId -> optionIndex

export default function SkillsCheckPage() {
  // --- Form state ---
  const [step, setStep] = useState<"intro" | "quiz" | "results">("intro");
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState<string>("");

  // Persist/restore minimal state
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cl_skills_check");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.answers) setAnswers(parsed.answers);
        if (parsed?.name) setName(parsed.name);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "cl_skills_check",
        JSON.stringify({ answers, name })
      );
    } catch {}
  }, [answers, name]);

  const questions: Question[] = useMemo(() => buildQuestions(), []);

  const progress = Math.round(
    (Object.keys(answers).length / questions.length) * 100
  );

  const { leaderboard, topTrack, strengths, suggestions } = useMemo(
    () => score(questions, answers),
    [questions, answers]
  );

  // Simple hash for shareable result (no PII beyond optional first name)
  const share = useMemo(() => {
    const payload = btoa(
      JSON.stringify({ v: 1, a: answers, n: name?.slice(0, 24) || undefined })
    );
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("r", payload);
      return url.toString();
    }
    return "";
  }, [answers, name]);

  // --- UI ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header band */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" /> CareerLaunch • 5‑min Skills Check
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-3">
          Find your best‑fit tech track
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          Answer a few quick questions. We’ll recommend a roadmap, starter
          projects, and your next 2 weeks of checkpoints.
        </p>

        {/* Progress pill */}
        {step !== "intro" && (
          <div className="mx-auto mt-6 max-w-xl">
            <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                role="progressbar"
              />
            </div>
            <div className="mt-2 text-sm text-slate-500">
              {progress}% complete
            </div>
          </div>
        )}
      </section>

      {/* Intro */}
      {step === "intro" && (
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: <Clock className="h-5 w-5" />,
                  title: "5 minutes",
                  text: "10 quick questions",
                },
                {
                  icon: <Target className="h-5 w-5" />,
                  title: "Personalised",
                  text: "Roadmap & projects",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  title: "Private",
                  text: "Stored on your device",
                },
              ].map((i, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    {i.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {i.title}
                    </div>
                    <div className="text-slate-600 text-sm">{i.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                First name (optional)
              </label>
              <input
                id="name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Aisha"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStep("quiz")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2 shadow"
              >
                Start skills check <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                href="/roadmap/frontend"
                className="border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-slate-400 transition"
              >
                Skip to a roadmap
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Quiz */}
      {step === "quiz" && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <ol className="space-y-6">
            {questions.map((q, idx) => (
              <li
                key={q.id}
                className="bg-white rounded-2xl p-6 shadow border border-slate-200"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mt-1">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg">
                      {q.title}
                    </h3>
                    {q.help && (
                      <div className="mt-1 text-slate-500 text-sm flex items-center gap-2">
                        <CircleHelp className="h-4 w-4" /> {q.help}
                      </div>
                    )}

                    <div
                      className="mt-4 grid md:grid-cols-5 gap-2"
                      role="radiogroup"
                      aria-label={q.title}
                    >
                      {q.options.map((opt, i) => {
                        const checked = answers[q.id] === i;
                        return (
                          <label
                            key={opt.value}
                            className={`cursor-pointer rounded-xl border px-3 py-3 text-sm text-center select-none transition ${
                              checked
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-slate-300 hover:border-slate-400"
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={opt.value}
                              className="sr-only"
                              checked={checked}
                              onChange={() =>
                                setAnswers((prev) => ({ ...prev, [q.id]: i }))
                              }
                            />
                            {opt.label}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setStep("results")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2 shadow disabled:opacity-60"
              disabled={Object.keys(answers).length < questions.length}
            >
              See my results <Trophy className="h-5 w-5" />
            </button>
            <button
              onClick={() => setAnswers({})}
              className="border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-slate-400 transition inline-flex items-center gap-2"
            >
              Reset <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </section>
      )}

      {/* Results */}
      {step === "results" && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Gauge className="h-4 w-4" /> Your personalised results
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {name ? `${name}, ` : ""}your best‑fit track:{" "}
              {TRACKS.find((t) => t.key === topTrack)?.label}
            </h2>
            <p className="text-slate-600 mt-2 max-w-3xl mx-auto">
              Based on your answers, here are your strengths, suggested starter
              projects, and the next two weeks of checkpoints.
            </p>

            <div className="mt-6">
              <Link
                href={
                  TRACKS.find((t) => t.key === topTrack)?.href ||
                  "/roadmap/frontend"
                }
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2 shadow"
              >
                Open recommended roadmap <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Leaderboard & strengths */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                Track fit leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((row) => (
                  <div key={row.key} className="flex items-center gap-4">
                    <div className="w-48 text-sm font-medium text-slate-700">
                      {TRACKS.find((t) => t.key === row.key)?.label}
                    </div>
                    <div className="flex-1 h-3 bg-slate-200/70 rounded-full overflow-hidden">
                      <div
                        className={`h-3 rounded-full ${
                          row.key === topTrack
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                            : "bg-blue-300"
                        }`}
                        style={{ width: `${Math.round(row.score * 100)}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm text-slate-600">
                      {Math.round(row.score * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                Your strengths
              </h3>
              <ul className="space-y-2">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-slate-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Starter projects & next 2 weeks */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">
                Suggested starter projects
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                {suggestions.projects.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FileCheck2 className="h-5 w-5 text-indigo-600 mt-0.5" />{" "}
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">
                Next 2 weeks of checkpoints
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                {suggestions.checkpoints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />{" "}
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Share & CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={share}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-slate-400 transition"
            >
              Copy shareable result link
            </a>
            <Link
              href={
                TRACKS.find((t) => t.key === topTrack)?.href ||
                "/roadmap/frontend"
              }
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2"
            >
              Open roadmap <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      )}

      {/* Footer hint back to roadmaps */}
      <footer className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-slate-500">
        Not sure yet?{" "}
        <Link
          href="#"
          onClick={() => setStep("quiz")}
          className="text-blue-700 hover:underline"
        >
          Answer the questions again
        </Link>{" "}
        or{" "}
        <Link href="/" className="text-blue-700 hover:underline">
          browse roadmaps
        </Link>
        .
      </footer>
    </div>
  );
}

// --- Question bank ---
function buildQuestions(): Question[] {
  const likert5 = [
    { value: "0", label: "Not at all" },
    { value: "1", label: "A little" },
    { value: "2", label: "Somewhat" },
    { value: "3", label: "Comfortable" },
    { value: "4", label: "Very confident" },
  ];

  return [
    {
      id: "html_css_ui",
      title: "How comfortable are you building responsive UIs with HTML/CSS?",
      help: "Layouts, components, accessibility basics",
      trackWeights: { frontend: 1 },
      options: likert5,
    },
    {
      id: "js_ts",
      title: "Your JavaScript/TypeScript comfort level",
      trackWeights: { frontend: 1, backend: 0.5 },
      options: likert5,
    },
    {
      id: "react_state",
      title: "State management and React component patterns",
      trackWeights: { frontend: 1 },
      options: likert5,
    },
    {
      id: "api_design",
      title: "Designing and implementing REST/GraphQL APIs",
      trackWeights: { backend: 1 },
      options: likert5,
    },
    {
      id: "db_models",
      title: "Working with databases (SQL/NoSQL) and schema design",
      trackWeights: { backend: 1, datascience: 0.4 },
      options: likert5,
    },
    {
      id: "linux_cloud",
      title: "Linux basics and cloud deployment comfort",
      trackWeights: { devops: 1, backend: 0.4 },
      options: likert5,
    },
    {
      id: "containers",
      title: "Using Docker/containers and CI/CD pipelines",
      trackWeights: { devops: 1, backend: 0.5 },
      options: likert5,
    },
    {
      id: "python_ml",
      title: "Python for data analysis/ML (pandas, NumPy, scikit‑learn)",
      trackWeights: { datascience: 1 },
      options: likert5,
    },
    {
      id: "stats_ml",
      title: "Stats/ML intuition (evaluation, overfitting, baselines)",
      trackWeights: { datascience: 1 },
      options: likert5,
    },
    {
      id: "systems_interest",
      title: "Which sounds most exciting right now?",
      help: "Pick how much each statement resonates",
      trackWeights: { frontend: 0, backend: 0, devops: 0, datascience: 0 },
      options: [
        {
          value: "fe",
          label: "Crafting delightful UIs & interactions",
          weight: 4,
        },
        {
          value: "be",
          label: "Designing robust APIs & data models",
          weight: 4,
        },
        { value: "do", label: "Automating infra & deployments", weight: 4 },
        {
          value: "ds",
          label: "Finding insights & predicting outcomes",
          weight: 4,
        },
        { value: "mix", label: "A mix / still exploring", weight: 2 },
      ],
    },
  ];
}

// --- Scoring ---
function score(questions: Question[], answers: Answers) {
  // Base accumulator for each track
  const totals: Record<TrackKey, number> = {
    frontend: 0,
    backend: 0,
    devops: 0,
    datascience: 0,
  };
  let maxPossible = 0; // for normalisation

  questions.forEach((q) => {
    const aIndex = answers[q.id];
    const hasAnswer = typeof aIndex === "number" && aIndex >= 0;

    // Determine picked score (0..4) unless weight specified
    const opt = hasAnswer ? q.options[aIndex] : undefined;
    const raw = opt?.weight ?? (hasAnswer ? aIndex : 0);

    // Max score possible for this question
    const maxForQ = Math.max(...q.options.map((o, idx) => o.weight ?? idx));

    // Apply weights per-track
    (Object.keys(totals) as TrackKey[]).forEach((track) => {
      const w = q.trackWeights[track] ?? 0;
      if (w > 0) {
        totals[track] += (raw / maxForQ) * w; // normalised 0..1 then weighted
      }
    });

    // interest-switch question (route intent)
    if (q.id === "systems_interest" && opt) {
      const map: Record<string, TrackKey | null> = {
        fe: "frontend",
        be: "backend",
        do: "devops",
        ds: "datascience",
        mix: null,
      };
      const t = map[opt.value];
      if (t) totals[t] += 0.6; // light bias toward declared interest
    }

    maxPossible += 1; // each question contributes up to 1 (after normalisation)
  });

  // Normalise totals 0..1 relative to number of questions considered for each track
  // (we already normalised each Q to <=1 with its per-track weight, so clamp)
  (Object.keys(totals) as TrackKey[]).forEach((k) => {
    totals[k] = Math.min(1, totals[k] / (questions.length * 0.35));
  });

  const leaderboard = (Object.keys(totals) as TrackKey[])
    .map((key) => ({ key, score: totals[key] }))
    .sort((a, b) => b.score - a.score);

  const topTrack = leaderboard[0].key;

  const strengths = buildStrengths(topTrack);
  const suggestions = buildSuggestions(topTrack);

  return { leaderboard, topTrack, strengths, suggestions };
}

function buildStrengths(track: TrackKey): string[] {
  switch (track) {
    case "frontend":
      return [
        "Strong visual & interaction thinking",
        "Comfort with React state and components",
        "Attention to accessibility and UX polish",
      ];
    case "backend":
      return [
        "System design and API thinking",
        "Data modeling instincts",
        "Reliability and test‑first mindset",
      ];
    case "devops":
      return [
        "Automation mindset & tooling curiosity",
        "Comfort with environments and deployments",
        "Observability and performance awareness",
      ];
    case "datascience":
      return [
        "Analytical reasoning and statistics intuition",
        "Python data tooling comfort",
        "Outcome‑driven experimentation",
      ];
  }
}

function buildSuggestions(track: TrackKey) {
  switch (track) {
    case "frontend":
      return {
        projects: [
          "Build a responsive dashboard with auth & charts",
          "A11y‑friendly component library (buttons, modals, toasts)",
          "Portfolio case study: performance budget & Lighthouse wins",
        ],
        checkpoints: [
          "Week 1: CSS layout drills (grid/flex) + semantic HTML",
          "Week 1: React state patterns (derived, lifted, context)",
          "Week 2: Router + protected routes + form validation",
          "Week 2: Write 8–10 component tests (RTL)",
        ],
      };
    case "backend":
      return {
        projects: [
          "RESTful To‑Do API with JWT + Postgres",
          "File upload service with presigned URLs",
          "Rate‑limited public API with OpenAPI docs",
        ],
        checkpoints: [
          "Week 1: ERD + migrations + seed data",
          "Week 1: AuthN/Z flows + refresh tokens",
          "Week 2: Unit + integration tests (coverage 80%+)",
          "Week 2: Observability (logs, metrics, tracing)",
        ],
      };
    case "devops":
      return {
        projects: [
          "Dockerise a full‑stack app + multi‑stage builds",
          "CI pipeline (lint, test, build, cache) on PRs",
          "IaC: provision a VM + reverse proxy + TLS",
        ],
        checkpoints: [
          "Week 1: Write a Dockerfile + docker‑compose",
          "Week 1: GitHub Actions pipeline with caching",
          "Week 2: Terraform 101 + remote state",
          "Week 2: Nginx + certbot TLS + blue/green basics",
        ],
      };
    case "datascience":
      return {
        projects: [
          "EDA + baseline model (classification) with clear report",
          "Feature engineering notebook + cross‑val",
          "Deploy a simple inference endpoint",
        ],
        checkpoints: [
          "Week 1: Clean, impute, encode; hold‑out vs CV",
          "Week 1: Baselines + error analysis",
          "Week 2: Model comparison + calibration",
          "Week 2: Reproducible notebook + model card",
        ],
      };
  }
}
