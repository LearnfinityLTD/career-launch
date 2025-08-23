/* --- file: app/admin/page.tsx --- */
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  sampleStudents,
  type Student,
  EmploymentStatus,
} from "../../lib/demoData";
import { theme } from "../../lib/theme";
import StudentModal from "../components/StudentModal";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import {
  ShieldCheck,
  TrendingUp,
  Building2,
  Download,
  Filter,
  LogIn,
  LockKeyhole,
  Users,
  PoundSterling,
} from "lucide-react";

const ADMIN_PASSWORD = "career2025"; // demo only
const COLORS = ["#1d4ed8", "#10b981", "#f59e0b", "#ef4444"]; // primary + accents

const fallbackTheme = {
  colors: { primary: "#1d4ed8" },
  universityName: "CareerLaunch Partner",
  logoUrl: "",
};

export default function AdminPage() {
  const t = { ...fallbackTheme, ...(theme || {}) } as typeof fallbackTheme;

  const [authed, setAuthed] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selected, setSelected] = useState<Student | null>(null);

  // Filters
  const [track, setTrack] = useState<"all" | Student["roadmap"]>("all");
  const [year, setYear] = useState<number | "all">("all");
  const [benchmark, setBenchmark] = useState(78); // sector employment benchmark (%)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students") || "null");
    setStudents(stored && stored.length ? stored : sampleStudents);
  }, []);

  // ---------- Derived data ----------
  const filtered = useMemo(() => {
    return students.filter(
      (s) =>
        (track === "all" || s.roadmap === track) &&
        (year === "all" || s.graduationYear === year)
    );
  }, [students, track, year]);

  const total = filtered.length;

  const employedCount = filtered.filter(
    (s) => s.employmentStatus === "Employed"
  ).length;
  const employmentRate = total ? Math.round((employedCount / total) * 100) : 0;

  const employmentData = useMemo<
    { status: EmploymentStatus; value: number }[]
  >(() => {
    const groups: Record<EmploymentStatus, number> = {
      Employed: 0,
      Seeking: 0,
      "Further Study": 0,
    };
    filtered.forEach((s) => {
      groups[s.employmentStatus] += 1;
    });
    return (Object.entries(groups) as [EmploymentStatus, number][]).map(
      ([status, value]) => ({ status, value })
    );
  }, [filtered]);

  const stackedCompletion = useMemo(() => {
    const byTrack: Record<string, { sum: number; count: number }> = {};
    filtered.forEach((s) => {
      byTrack[s.roadmap] = byTrack[s.roadmap] || { sum: 0, count: 0 };
      byTrack[s.roadmap].sum += s.progress;
      byTrack[s.roadmap].count += 1;
    });
    return Object.entries(byTrack).map(([roadmap, { sum, count }]) => {
      const completed = Math.round(sum / count);
      return {
        roadmap,
        label: roadmapTitle(roadmap),
        completed,
        remaining: 100 - completed,
      };
    });
  }, [filtered]);

  const lineSeries = useMemo(() => {
    const points: { date: number; values: number[] }[] = [];
    filtered.forEach((s) => {
      if (!s.progressHistory) return;
      s.progressHistory.forEach((p) => {
        const d = new Date(p.date);
        const key = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate()
        ).getTime();
        let bucket = points.find((x) => x.date === key);
        if (!bucket) {
          bucket = { date: key, values: [] };
          points.push(bucket);
        }
        bucket.values.push(p.progress);
      });
    });
    points.sort((a, b) => a.date - b.date);
    return points.map((b) => ({
      date: new Date(b.date).toLocaleDateString(),
      avgProgress: Math.round(
        b.values.reduce((a, c) => a + c, 0) / b.values.length
      ),
    }));
  }, [filtered]);

  // Salary + ROI (demo model)
  const avgSalaryBase = 32000; // sector baseline starting salary
  const avgSalaryUplift = 6000; // CareerLaunch uplift assumption
  const salaryWithCL = avgSalaryBase + avgSalaryUplift;
  const roiAnnualBenefit = Math.round(employedCount * avgSalaryUplift);
  const roiInvestment = 5000; // demo Professional plan
  const roiMultiple = roiInvestment
    ? (roiAnnualBenefit / roiInvestment).toFixed(1)
    : "-";

  const rankingImpact = Math.max(
    0,
    Math.round((employmentRate - benchmark) / 2)
  ); // rough demo heuristic

  // At-risk / anomaly detection (demo)
  const atRisk = filtered.filter(
    (s) => s.employmentStatus === "Seeking" && s.progress < 30
  );
  const stagnating = filtered.filter((s) => {
    const last = s.progressHistory?.[s.progressHistory.length - 1];
    const prev = s.progressHistory?.[s.progressHistory.length - 2];
    if (!last || !prev) return false;
    const deltaDays =
      (new Date(last.date).getTime() - new Date(prev.date).getTime()) /
      (1000 * 60 * 60 * 24);
    return deltaDays > 10 && last.progress - prev.progress < 2;
  });

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Name",
      "Course",
      "Year",
      "Track",
      "Progress",
      "Status",
      "Employer",
    ];
    const rows = filtered.map((s) => [
      s.name,
      s.course,
      s.graduationYear,
      s.roadmap,
      `${s.progress}%`,
      s.employmentStatus,
      s.employer || "",
    ]);
    const csv = [headers, ...rows]
      .map((r) =>
        r.map((x) => `"${String(x).replaceAll('"', '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `careerlaunch_students.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------- Auth gate ----------
  if (!authed) {
    return (
      <section className="mx-auto max-w-sm px-4 py-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg" />
          {t.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.logoUrl}
              alt={`${t.universityName} logo`}
              className="h-8 w-auto"
            />
          )}
          <h1 className="text-xl font-bold">
            University Dashboard – {t.universityName}
          </h1>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-slate-700">
          <LockKeyhole className="h-4 w-4" /> Demo password:{" "}
          <code className="rounded bg-slate-100 px-1">{ADMIN_PASSWORD}</code>
        </div>

        <input
          type="password"
          placeholder="Enter password"
          className="w-full rounded border px-3 py-2 mb-3"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value === ADMIN_PASSWORD)
              setAuthed(true);
          }}
        />
        <p className="text-sm text-slate-500">
          Press Enter after typing password
        </p>

        {/* Fake SSO banner */}
        <div className="mt-6 flex items-center gap-3 rounded-xl border bg-white p-4">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <div>
            <div className="text-sm font-semibold">
              Single Sign-On available
            </div>
            <div className="text-xs text-slate-500">
              SAML/SCIM integration with Azure AD & Okta in Enterprise.
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Main UI ----------
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          {t.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.logoUrl} alt="Uni logo" className="h-10 w-auto" />
          )}
          <div>
            <h1 className="text-2xl font-bold">
              University Dashboard – {t.universityName}
            </h1>
            <p className="text-sm text-slate-500">
              Cohort health • Outcomes • ROI
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div
            className="rounded-md border px-3 py-1"
            style={{ borderColor: t.colors.primary, color: t.colors.primary }}
          >
            Demo
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="mb-6 grid gap-3 md:grid-cols-4">
        <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
          <Filter className="h-4 w-4" /> Track
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value as any)}
            className="ml-auto rounded border px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
            <option value="datascience">Data Science</option>
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
          {" "}
          Year
          <select
            value={year}
            onChange={(e) =>
              setYear(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            className="ml-auto rounded border px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            {[...new Set(students.map((s) => s.graduationYear))]
              .sort()
              .map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
          {" "}
          Sector benchmark
          <input
            type="number"
            min={0}
            max={100}
            value={benchmark}
            onChange={(e) => setBenchmark(Number(e.target.value))}
            className="ml-auto w-16 rounded border px-2 py-1 text-sm"
          />
          %
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center justify-center gap-2 rounded-xl border bg-white px-3 py-2 hover:bg-slate-50"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <KPI
          title="Employment rate (6-mo)"
          value={`${employmentRate}%`}
          sub={`${employmentRate - benchmark >= 0 ? "+" : ""}${
            employmentRate - benchmark
          }% vs sector`}
          icon={<TrendingUp className="h-5 w-5" />}
          color={t.colors.primary}
        />
        <KPI
          title="Avg progress (cohort)"
          value={`${avgOf(filtered.map((s) => s.progress))}%`}
          sub={`${filtered.length} students`}
          icon={<Users className="h-5 w-5" />}
          color="#10b981"
        />
        <KPI
          title="Salary uplift (est.)"
          value={`£${format(roiAnnualBenefit)}`}
          sub={`£${format(avgSalaryBase)} → £${format(salaryWithCL)}`}
          icon={<PoundSterling className="h-5 w-5" />}
          color="#f59e0b"
        />
        <KPI
          title="Ranking impact (est.)"
          value={`+${rankingImpact}`}
          sub={`vs ${benchmark}% sector`}
          icon={<Building2 className="h-5 w-5" />}
          color="#6366f1"
        />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Average Progress Over Time
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={lineSeries} key={`line-${track}-${year}`}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={t.colors.primary}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor={t.colors.primary}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="avgProgress"
                stroke={t.colors.primary}
                fill="url(#grad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Employment Outcomes</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart key={`pie-${track}-${year}`}>
              <Pie
                data={employmentData}
                dataKey="value"
                nameKey="status"
                innerRadius={60}
                outerRadius={100}
                label
              >
                {employmentData.map((e, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 rounded-xl border bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          Completion by Career Path
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={stackedCompletion} key={`bar-${track}-${year}`}>
            <XAxis dataKey="label" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="completed"
              stackId="a"
              fill={t.colors.primary}
              name="Completed %"
            />
            <Bar
              dataKey="remaining"
              stackId="a"
              fill="#e2e8f0"
              name="Remaining %"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ROI callout */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border bg-white p-6 shadow">
          <h2 className="mb-1 text-lg font-semibold">ROI Snapshot</h2>
          <p className="mb-4 text-sm text-slate-600">
            Based on current employed graduates and salary uplift assumptions.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">
                £{format(roiAnnualBenefit)}
              </div>
              <div className="text-xs text-slate-500">Annual salary uplift</div>
            </div>
            <div>
              <div className="text-2xl font-bold">£{format(roiInvestment)}</div>
              <div className="text-xs text-slate-500">Annual investment</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{roiMultiple}x</div>
              <div className="text-xs text-slate-500">ROI multiple</div>
            </div>
          </div>
        </div>

        {/* Health panel */}
        <div className="rounded-xl border bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold">Cohort Health</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>At-risk (seeking &lt;30% progress)</span>
              <span className="font-semibold">{atRisk.length}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Stagnating (&gt;10d, &lt;2% delta)</span>
              <span className="font-semibold">{stagnating.length}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Total students</span>
              <span className="font-semibold">{total}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Students table */}
      <div className="mt-6 rounded-xl border bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Students</h2>
          <span className="text-sm text-slate-500">
            Click a row for details
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Course</th>
                <th className="px-3 py-2">Year</th>
                <th className="px-3 py-2">Track</th>
                <th className="px-3 py-2">Progress</th>
                <th className="px-3 py-2">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="border-t hover:bg-slate-50 cursor-pointer"
                  onClick={() => setSelected(s)}
                >
                  <td className="px-3 py-2 font-medium text-slate-900">
                    {s.name}
                  </td>
                  <td className="px-3 py-2">{s.course}</td>
                  <td className="px-3 py-2">{s.graduationYear}</td>
                  <td className="px-3 py-2">{roadmapTitle(s.roadmap)}</td>
                  <td className="px-3 py-2">{s.progress}%</td>
                  <td className="px-3 py-2">{s.employmentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <StudentModal student={selected} onClose={() => setSelected(null)} />
      )}

      {/* Footer ribbon */}
      <div className="mt-8 rounded-xl border bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-4 text-white">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-semibold">
              TEF & accreditation-ready reporting
            </span>
            <span className="text-white/80">
              • CSV export • Benchmarks • ROI
            </span>
          </div>
          <div className="text-sm">
            Need enterprise SSO? Azure AD/Okta available in Enterprise.
          </div>
        </div>
      </div>
    </section>
  );
}

function KPI({
  title,
  value,
  sub,
  icon,
  color,
}: {
  title: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500">{title}</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
          {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
        </div>
        <div
          className="h-10 w-10 rounded-xl"
          style={{ background: `${color || "#1d4ed8"}20`, color }}
        >
          <div className="flex h-full w-full items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

function roadmapTitle(slug: string) {
  switch (slug) {
    case "frontend":
      return "Frontend";
    case "backend":
      return "Backend";
    case "devops":
      return "DevOps";
    case "datascience":
      return "Data Science";
    default:
      return slug;
  }
}

function avgOf(nums: number[]) {
  if (!nums.length) return 0;
  return Math.round(nums.reduce((a, c) => a + c, 0) / nums.length);
}
function format(n: number) {
  return n.toLocaleString();
}
