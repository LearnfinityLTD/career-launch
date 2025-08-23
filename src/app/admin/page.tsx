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
} from "recharts";

const ADMIN_PASSWORD = "career2025"; // demo only
const COLORS = ["#1d4ed8", "#10b981", "#f59e0b", "#ef4444"]; // primary + accents

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selected, setSelected] = useState<Student | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students") || "null");
    setStudents(stored && stored.length ? stored : sampleStudents);
  }, []);

  // ---------- Derived data (must always run hooks!) ----------
  const total = students.length;

  const employmentData = useMemo<
    { status: EmploymentStatus; value: number }[]
  >(() => {
    const groups: Record<EmploymentStatus, number> = {
      Employed: 0,
      Seeking: 0,
      "Further Study": 0,
    };

    students.forEach((s) => {
      groups[s.employmentStatus] += 1;
    });

    return (Object.entries(groups) as [EmploymentStatus, number][]).map(
      ([status, value]) => ({ status, value })
    );
  }, [students]);

  const stackedCompletion = useMemo(() => {
    // average progress per roadmap converted to completed vs remaining
    const byTrack: Record<string, { sum: number; count: number }> = {};
    students.forEach((s) => {
      byTrack[s.roadmap] = byTrack[s.roadmap] || { sum: 0, count: 0 };
      byTrack[s.roadmap].sum += s.progress;
      byTrack[s.roadmap].count += 1;
    });
    return Object.entries(byTrack).map(([roadmap, { sum, count }]) => ({
      roadmap,
      completed: Math.round(sum / count),
      remaining: 100 - Math.round(sum / count),
    }));
  }, [students]);

  const lineSeries = useMemo(() => {
    const points: { date: number; values: number[] }[] = [];

    students.forEach((s) => {
      if (!s.progressHistory) return; // ✅ guard against undefined
      s.progressHistory.forEach((p) => {
        const d = new Date(p.date); // ✅ now works, p.date is ISO string
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
  }, [students]);

  const roadmapTitle = (slug: string) => {
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
  };

  // ---------- Conditional UI ----------
  if (!authed) {
    return (
      <section className="mx-auto max-w-sm px-4 py-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg" />
          {theme.logoUrl && (
            <img
              src={theme.logoUrl}
              alt={`${theme.universityName} logo`}
              className="h-8 w-auto"
            />
          )}
          <h1 className="text-xl font-bold">
            University Dashboard – {theme.universityName}
          </h1>
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
      </section>
    );
  }

  // ---------- Main UI ----------
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {theme.logoUrl && (
            <img src={theme.logoUrl} alt="Uni logo" className="h-10 w-auto" />
          )}
          <h1 className="text-2xl font-bold">
            University Dashboard – {theme.universityName}
          </h1>
        </div>
        <div
          className="rounded-md border px-3 py-1 text-sm"
          style={{
            borderColor: theme.colors.primary,
            color: theme.colors.primary,
          }}
        >
          Demo
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Line chart: avg progress over time */}
        <div className="rounded-xl border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Average Progress Over Time
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineSeries}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgProgress"
                stroke={theme.colors.primary}
                strokeWidth={2}
                dot={false}
                name="Average %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut: employment outcomes */}
        <div className="rounded-xl border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Employment Outcomes</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
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

      {/* Stacked bar: completion by roadmap */}
      <div className="mt-6 rounded-xl border bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          Completion by Career Path
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={stackedCompletion}>
            <XAxis dataKey={(d) => roadmapTitle(d.roadmap)} />
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

      {/* Students table */}
      <div className="mt-6 rounded-xl border bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">Students</h2>
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
              {students.map((s) => (
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
    </section>
  );
}
