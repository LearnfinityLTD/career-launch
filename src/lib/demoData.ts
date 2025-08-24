// demoData.ts
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

// --- Seed (your original 4) -------------------------------------------------
const seedStudents: Student[] = [
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
    progress: 20,
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

// --- Generator to expand to N students --------------------------------------
const firstNames = [
  "Ella",
  "Frank",
  "Grace",
  "Hassan",
  "Ivy",
  "Jamal",
  "Keira",
  "Liam",
  "Maya",
  "Noah",
  "Omar",
  "Priya",
  "Quinn",
  "Rosa",
  "Sam",
  "Tariq",
  "Uma",
  "Victor",
  "Wen",
  "Yara",
  "Zane",
];
const lastNames = [
  "Smith",
  "Brown",
  "Wilson",
  "Ahmed",
  "Garcia",
  "Martin",
  "Taylor",
  "Khan",
  "Walker",
  "Nguyen",
  "Clark",
  "Hughes",
];
const courses = [
  "BSc Computer Science",
  "MSc Data Science",
  "BEng Software Engineering",
  "BSc Artificial Intelligence",
  "MSc Cybersecurity",
];
const roadmaps: RoadmapKey[] = ["frontend", "backend", "datascience", "devops"];
const employers = [
  "ACME Web",
  "DataNest",
  "ByteForge",
  "Skyview Labs",
  "NovaWorks",
  "CloudGrid",
  "DeepStream",
];

// simple deterministic RNG so the dataset is stable between reloads
let seed = 42;
function rnd() {
  seed = (seed * 1664525 + 1013904223) % 2 ** 32;
  return seed / 2 ** 32;
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(rnd() * arr.length)];
}

function progressHistory(weeks = 5): ProgressPoint[] {
  let p = Math.floor(rnd() * 15); // start near 0–15
  const hist: ProgressPoint[] = [];
  for (let i = weeks; i >= 1; i--) {
    // increment with slight randomness but monotonic
    p = Math.min(100, p + 10 + Math.floor(rnd() * 18));
    hist.push({
      date: new Date(now - day * (i * 7)).toISOString(),
      progress: p,
    });
  }
  return hist;
}

function makeStudents(startIdx: number, count: number): Student[] {
  const out: Student[] = [];
  for (let i = 0; i < count; i++) {
    const idx = startIdx + i;
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const roadmap = pick(roadmaps);
    const course = pick(courses);
    const grad = 2023 + Math.floor(rnd() * 4); // 2023–2026
    const hist = progressHistory(5);
    const latest = hist[hist.length - 1].progress;
    const status: EmploymentStatus = (
      ["Employed", "Seeking", "Further Study"] as const
    )[Math.floor(rnd() * 3)];
    out.push({
      id: `s${idx}`,
      name: `${fn} ${ln}`,
      course,
      graduationYear: grad,
      roadmap,
      progress: latest,
      progressHistory: hist,
      employmentStatus: status,
      employer: status === "Employed" ? pick(employers) : undefined,
      completedSkills: [], // keep empty to avoid mismatching ROADMAP skill ids
    });
  }
  return out;
}

// --- Final export: expand to 100 students -----------------------------------
const targetTotal = 100; // change to 50/200 if you want
const need = Math.max(0, targetTotal - seedStudents.length);

export const sampleStudents: Student[] = [
  ...seedStudents,
  ...makeStudents(seedStudents.length + 1, need),
];
