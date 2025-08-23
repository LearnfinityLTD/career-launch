"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProgressForRoadmap } from "../../lib/storage";
import { type RoadmapKey, ROADMAPS } from "../../lib/roadmaps";
import clsx from "clsx";

export default function RoadmapCard({ slug }: { slug: RoadmapKey }) {
  const roadmap = ROADMAPS[slug];
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(getProgressForRoadmap(slug));
    const onStorage = () => setProgress(getProgressForRoadmap(slug));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [slug]);

  return (
    <Link href={`/roadmap/${slug}`} className="group block">
      <div
        className={clsx(
          "rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700 transition">
              {roadmap.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{roadmap.tagline}</p>
          </div>
          <div className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium">
            {progress}%
          </div>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-brand-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-slate-500">
          {roadmap.skills.length} skills / projects
        </p>
      </div>
    </Link>
  );
}
