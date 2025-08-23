"use client";
import { type RoadmapKey } from "./roadmaps";

const key = (slug: RoadmapKey) => `careerlaunch:${slug}:skills`;

export type SkillProgress = Record<string, boolean>;

export function getProgressForRoadmap(slug: RoadmapKey): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(key(slug));
    if (!raw) return 0;
    const obj: SkillProgress = JSON.parse(raw);
    const total = Object.keys(obj).length;
    if (total === 0) return 0;
    const done = Object.values(obj).filter(Boolean).length;
    return Math.round((done / total) * 100);
  } catch {
    return 0;
  }
}

export function readSkills(slug: RoadmapKey): SkillProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(key(slug));
    return raw ? (JSON.parse(raw) as SkillProgress) : {};
  } catch {
    return {};
  }
}

export function writeSkills(slug: RoadmapKey, skills: SkillProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key(slug), JSON.stringify(skills));
    // trigger homepage progress update in other tabs/components
    localStorage.setItem("careerlaunch:lastUpdate", Date.now().toString());
  } catch {}
}
