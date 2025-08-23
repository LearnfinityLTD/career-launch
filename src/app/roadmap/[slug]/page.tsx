/* --- file: app/roadmap/[slug]/page.tsx --- */
"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { ROADMAPS, type RoadmapKey } from "../../../lib/roadmaps";
import { readSkills, writeSkills } from "../../../lib/storage";
import ProgressBar from "../../components/ProgressBar";

export default function RoadmapPage({ params }: { params: { slug: string } }) {
  const roadmap = ROADMAPS[params.slug as RoadmapKey];
  if (!roadmap) return notFound();

  const [skills, setSkills] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSkills(readSkills(roadmap.slug));
  }, [roadmap.slug]);

  const toggleSkill = (id: string) => {
    const updated = { ...skills, [id]: !skills[id] };
    setSkills(updated);
    writeSkills(roadmap.slug, updated);
  };

  const markAll = () => {
    const updated: Record<string, boolean> = {};
    roadmap.skills.forEach((s) => (updated[s.id] = true));
    setSkills(updated);
    writeSkills(roadmap.slug, updated);
  };

  const resetAll = () => {
    const updated: Record<string, boolean> = {};
    roadmap.skills.forEach((s) => (updated[s.id] = false));
    setSkills(updated);
    writeSkills(roadmap.slug, updated);
  };

  const total = roadmap.skills.length;
  const completed = Object.values(skills).filter(Boolean).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">{roadmap.title}</h1>
      <p className="mt-2 text-slate-600">{roadmap.tagline}</p>

      <div className="mt-6 rounded-xl border bg-white p-6 shadow">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-slate-600">
            {completed} of {total} completed
          </span>
          <div className="flex gap-2">
            <button
              onClick={markAll}
              className="text-xs rounded-md bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700"
            >
              Mark all as complete
            </button>
            <button
              onClick={resetAll}
              className="text-xs rounded-md bg-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-300"
            >
              Reset progress
            </button>
          </div>
        </div>
        <ProgressBar value={progress} />

        <ul className="mt-6 space-y-3">
          {roadmap.skills.map((skill) => (
            <li key={skill.id} className="flex items-center gap-3">
              <input
                id={skill.id}
                type="checkbox"
                checked={!!skills[skill.id]}
                onChange={() => toggleSkill(skill.id)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={skill.id}
                className="cursor-pointer text-slate-800 hover:text-slate-900"
              >
                {skill.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
