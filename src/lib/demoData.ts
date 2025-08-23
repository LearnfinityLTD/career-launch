import type { RoadmapKey } from "./roadmaps";

export type EmploymentStatus = "Employed" | "Seeking" | "Further Study";

export type ProgressPoint = { date: string; progress: number };

export type Student = {
  id: string;
  name: string;
  course: string;
  graduationYear: number;
  roadmap: RoadmapKey;
  progress: number; // 0-100 current progress
  progressHistory: ProgressPoint[]; // sorted ascending by date
  employmentStatus: EmploymentStatus;
  employer?: string;
  completedSkills: string[]; // ids from ROADMAPS[roadmap].skills
};

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

export const sampleStudents: Student[] = [
  {
    id: "s1",
    name: "Alice Johnson",
    course: "BSc Computer Science",
    graduationYear: 2024,
    roadmap: "frontend",
    progress: 82,
    progressHistory: [
      { date: new Date(now - day * 28).toISOString(), progress: 10 },
      { date: new Date(now - day * 21).toISOString(), progress: 35 },
      { date: new Date(now - day * 14).toISOString(), progress: 60 },
      { date: new Date(now - day * 7).toISOString(), progress: 74 },
      { date: new Date(now - day * 1).toISOString(), progress: 82 },
    ],
    employmentStatus: "Employed",
    employer: "ACME Web",
    completedSkills: [
      "html-semantics",
      "css-layouts",
      "responsive",
      "tailwind",
      "js-es6",
      "ts-basics",
      "react-core",
      "next-routing",
      "forms",
      "a11y",
      "testing",
      "perf",
    ],
  },
  {
    id: "s2",
    name: "Brian Lee",
    course: "MSc Data Science",
    graduationYear: 2023,
    roadmap: "datascience",
    progress: 64,
    progressHistory: [
      { date: new Date(now - day * 28).toISOString(), progress: 5 },
      { date: new Date(now - day * 20).toISOString(), progress: 22 },
      { date: new Date(now - day * 12).toISOString(), progress: 45 },
      { date: new Date(now - day * 5).toISOString(), progress: 58 },
      { date: new Date(now - day * 1).toISOString(), progress: 64 },
    ],
    employmentStatus: "Seeking",
    completedSkills: [
      "py-core",
      "viz",
      "stats",
      "ml-basics",
      "sklearn",
      "validation",
      "sql",
    ],
  },
  {
    id: "s3",
    name: "Chloe Patel",
    course: "BEng Software Engineering",
    graduationYear: 2024,
    roadmap: "backend",
    progress: 48,
    progressHistory: [
      { date: new Date(now - day * 30).toISOString(), progress: 0 },
      { date: new Date(now - day * 18).toISOString(), progress: 18 },
      { date: new Date(now - day * 9).toISOString(), progress: 34 },
      { date: new Date(now - day * 2).toISOString(), progress: 48 },
    ],
    employmentStatus: "Further Study",
    completedSkills: [
      "http-rest",
      "api-design",
      "node-express",
      "sql",
      "db-design",
    ],
  },
  {
    id: "s4",
    name: "Daniel Green",
    course: "BSc Computer Science",
    graduationYear: 2025,
    roadmap: "devops",
    progress: 26,
    progressHistory: [
      { date: new Date(now - day * 25).toISOString(), progress: 0 },
      { date: new Date(now - day * 14).toISOString(), progress: 8 },
      { date: new Date(now - day * 6).toISOString(), progress: 18 },
      { date: new Date(now - day * 1).toISOString(), progress: 26 },
    ],
    employmentStatus: "Seeking",
    completedSkills: ["linux", "gitflow", "docker"],
  },
];
