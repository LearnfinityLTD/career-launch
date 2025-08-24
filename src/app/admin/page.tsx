/* --- file: app/admin/page.tsx --- */
"use client";

import { useMemo, useState } from "react";
import { sampleStudents, type Student } from "../../lib/demoData";
import { theme } from "../../lib/theme";
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
  LockKeyhole,
  Award,
  Target,
  AlertTriangle,
  Calendar,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";

const ADMIN_PASSWORD = "career2025";
const COLORS = ["#1d4ed8", "#10b981", "#f59e0b", "#ef4444"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [students] = useState<Student[]>(sampleStudents);
  const [selected, setSelected] = useState<Student | null>(null);

  // Filters
  const [track, setTrack] = useState<"all" | Student["roadmap"]>("all");
  const [year, setYear] = useState<number | "all">("all");
  const [benchmark, setBenchmark] = useState(78);

  // Historical data for trends
  const [previousPeriodEmploymentRate] = useState(65);

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
  const employmentTrend = employmentRate - previousPeriodEmploymentRate;

  // Enhanced metrics
  const totalRevenueGenerated = employedCount * 38000; // Lifetime graduate value
  const roiInvestment = 5000;
  const roiMultiple = roiInvestment
    ? (totalRevenueGenerated / roiInvestment).toFixed(1)
    : "-";

  // League table impact calculation
  const leagueTableImpact = Math.max(0, Math.round((employmentRate - 65) / 5));

  const employmentData = useMemo(() => {
    const groups: Record<string, number> = {
      Employed: 0,
      Seeking: 0,
      "Further Study": 0,
    };
    filtered.forEach((s) => {
      groups[s.employmentStatus] += 1;
    });
    return Object.entries(groups).map(([status, value]) => ({ status, value }));
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

  // Risk analysis
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

  if (!authed) {
    return (
      <section className="mx-auto max-w-sm px-4 py-16">
        <div className="mb-6 flex items-center gap-3">
          {theme.logoUrl && (
            <img
              src={theme.logoUrl}
              alt={`${theme.universityName} logo`}
              className="h-10 w-auto"
            />
          )}
          <div>
            <h1 className="text-xl font-bold">University Dashboard</h1>
            <p className="text-sm text-slate-600">{theme.universityName}</p>
          </div>
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

        <div className="mt-6 flex items-center gap-3 rounded-xl border bg-white p-4">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <div>
            <div className="text-sm font-semibold">
              Single Sign-On Available
            </div>
            <div className="text-xs text-slate-500">
              SAML/SCIM integration with Azure AD & Okta in Enterprise.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          {theme.logoUrl && (
            <img
              src={theme.logoUrl}
              alt="University logo"
              className="h-12 w-auto"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">University Dashboard</h1>
            <p className="text-sm text-slate-500">
              {theme.universityName} • Cohort Health • Outcomes • ROI
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div
            className="rounded-md border px-3 py-1"
            style={{
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
            }}
          >
            Demo Mode
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="mb-6 grid gap-3 md:grid-cols-5">
        <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
          <Filter className="h-4 w-4" /> Track
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value as any)}
            className="ml-auto rounded border px-2 py-1 text-sm"
          >
            <option value="all">All Tracks</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
            <option value="datascience">Data Science</option>
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
          <Calendar className="h-4 w-4" /> Year
          <select
            value={year}
            onChange={(e) =>
              setYear(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            className="ml-auto rounded border px-2 py-1 text-sm"
          >
            <option value="all">All Years</option>
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
          <Target className="h-4 w-4" /> Benchmark
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

      {/* Enhanced KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPI
          title="Employment Rate (6-mo)"
          value={`${employmentRate}%`}
          sub={`${
            employmentTrend >= 0 ? "+" : ""
          }${employmentTrend}% vs last year • ${
            employmentRate - benchmark >= 0 ? "+" : ""
          }${employmentRate - benchmark}% vs sector`}
          icon={<TrendingUp className="h-5 w-5" />}
          color={theme.colors.primary}
          trend={employmentTrend}
        />

        <KPI
          title="Revenue Generated (est.)"
          value={`£${format(totalRevenueGenerated)}`}
          sub={`Total economic impact • ${employedCount} graduates employed`}
          icon={<Award className="h-5 w-5" />}
          color="#10b981"
        />

        <KPI
          title="League Table Impact"
          value={`+${leagueTableImpact} positions`}
          sub={`Est. ranking improvement • ROI: ${roiMultiple}x`}
          icon={<Building2 className="h-5 w-5" />}
          color="#8b5cf6"
        />
      </div>

      {/* Risk Alerts */}
      {(atRisk.length > 0 || stagnating.length > 0) && (
        <div className="mt-6 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900">Action Required</h3>
              <div className="text-sm text-amber-800 space-y-1">
                {atRisk.length > 0 && (
                  <p>
                    <strong>{atRisk.length} students</strong> are at risk
                    (seeking employment, &lt;30% progress)
                  </p>
                )}
                {stagnating.length > 0 && (
                  <p>
                    <strong>{stagnating.length} students</strong> showing
                    stagnant progress (&gt;10 days, &lt;2% improvement)
                  </p>
                )}
                <p className="font-medium">
                  Recommended: Schedule intervention meetings with academic
                  advisors
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Progress Trajectory</h2>
            <div className="text-xs text-slate-500">
              Cohort average over time
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={lineSeries} key={`line-${track}-${year}`}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.colors.primary}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.colors.primary}
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
                stroke={theme.colors.primary}
                fill="url(#grad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Employment Outcomes</h2>
            <div className="text-xs text-slate-500">
              6-month post-graduation
            </div>
          </div>
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Completion by Career Path</h2>
          <div className="text-xs text-slate-500">
            Average progress percentage
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={stackedCompletion} key={`bar-${track}-${year}`}>
            <XAxis dataKey="label" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="completed"
              stackId="a"
              fill={theme.colors.primary}
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

      {/* ROI & Health Panel */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold">ROI Analysis</h2>
          <p className="mb-4 text-sm text-slate-600">
            Financial impact based on employed graduates.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">
                £{format(totalRevenueGenerated)}
              </div>
              <div className="text-xs text-slate-500">
                Total Revenue Generated
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">£{format(roiInvestment)}</div>
              <div className="text-xs text-slate-500">Annual Investment</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">
                {roiMultiple}x
              </div>
              <div className="text-xs text-slate-500">ROI Multiple</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow">
          <h2 className="mb-3 text-lg font-semibold">Cohort Health</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>At Risk</span>
              </div>
              <span className="font-semibold">{atRisk.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>Stagnating</span>
              </div>
              <span className="font-semibold">{stagnating.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>On Track</span>
              </div>
              <span className="font-semibold">
                {total - atRisk.length - stagnating.length}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-medium">Total Students</span>
              <span className="font-bold">{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="mt-6 rounded-xl border bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Students ({filtered.length})
          </h2>
          <span className="text-sm text-slate-500">
            Click a row for detailed profile
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
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Employer</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className={`border-t hover:bg-slate-50 cursor-pointer ${
                    atRisk.includes(s)
                      ? "bg-red-50"
                      : stagnating.includes(s)
                      ? "bg-amber-50"
                      : ""
                  }`}
                  onClick={() => setSelected(s)}
                >
                  <td className="px-3 py-2 font-medium text-slate-900 flex items-center gap-2">
                    {s.name}
                    {atRisk.includes(s) && (
                      <AlertTriangle className="h-3 w-3 text-red-500" />
                    )}
                    {s.employmentStatus === "Employed" && (
                      <Star className="h-3 w-3 text-yellow-500" />
                    )}
                  </td>
                  <td className="px-3 py-2">{s.course}</td>
                  <td className="px-3 py-2">{s.graduationYear}</td>
                  <td className="px-3 py-2">{roadmapTitle(s.roadmap)}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${s.progress}%` }}
                        ></div>
                      </div>
                      <span>{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        s.employmentStatus === "Employed"
                          ? "bg-green-100 text-green-800"
                          : s.employmentStatus === "Seeking"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {s.employmentStatus}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {s.employer || <span className="text-slate-400">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{selected.name}</h2>
                <p className="text-slate-600">
                  {selected.course} • {selected.graduationYear}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Career Track
                  </label>
                  <p className="text-slate-900">
                    {roadmapTitle(selected.roadmap)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Progress
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${selected.progress}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{selected.progress}%</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Employment Status
                  </label>
                  <p className="text-slate-900">{selected.employmentStatus}</p>
                </div>
              </div>

              <div className="space-y-3">
                {selected.employer && (
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Employer
                    </label>
                    <p className="text-slate-900">{selected.employer}</p>
                  </div>
                )}
              </div>
            </div>

            {selected.progressHistory &&
              selected.progressHistory.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Progress Timeline</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      data={selected.progressHistory.map((p) => ({
                        date: new Date(p.date).toLocaleDateString(),
                        progress: p.progress,
                      }))}
                    >
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke={theme.colors.primary}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 rounded-xl border bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6" />
            <div>
              <div className="font-semibold text-lg">
                TEF & Accreditation Ready
              </div>
              <div className="text-white/90 text-sm">
                Comprehensive reporting • CSV exports • Benchmarking • ROI
                analysis
              </div>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-medium">Enterprise Features Available:</div>
            <div className="text-white/80">
              Azure AD/Okta SSO • Advanced Analytics • Custom Branding
            </div>
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
  trend,
}: {
  title: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: number;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm text-slate-500 mb-1">{title}</div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
          {sub && <div className="text-xs text-slate-500">{sub}</div>}
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 mt-2 text-xs ${
                trend > 0
                  ? "text-green-600"
                  : trend < 0
                  ? "text-red-600"
                  : "text-slate-500"
              }`}
            >
              {trend > 0 ? (
                <ArrowUp className="h-3 w-3" />
              ) : trend < 0 ? (
                <ArrowDown className="h-3 w-3" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
              <span>{Math.abs(trend)}% vs last period</span>
            </div>
          )}
        </div>
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center"
          style={{ background: `${color || "#1d4ed8"}20`, color }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function roadmapTitle(slug: string) {
  switch (slug) {
    case "frontend":
      return "Frontend Development";
    case "backend":
      return "Backend Development";
    case "devops":
      return "DevOps Engineering";
    case "datascience":
      return "Data Science";
    default:
      return slug;
  }
}

function format(n: number) {
  return n.toLocaleString();
}
