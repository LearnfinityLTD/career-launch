"use client";
import { ROADMAPS } from "../../lib/roadmaps";
import type { Student } from "../../lib/demoData";
import ProgressBar from "./ProgressBar";

export default function StudentModal({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) {
  const roadmap = ROADMAPS[student.roadmap];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {student.name}
            </h2>
            <p className="text-sm text-slate-600">
              {student.course} • {student.graduationYear}
            </p>
            <p className="text-sm text-slate-600">Track: {roadmap.title}</p>
            <p className="text-sm mt-1">
              <span className="font-medium">Outcome:</span>{" "}
              {student.employmentStatus}
              {student.employer ? ` @ ${student.employer}` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border px-3 py-1 text-sm hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="mt-4">
          <span className="text-sm text-slate-600">
            Progress: {student.progress}%
          </span>
          <ProgressBar value={student.progress} />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Completed Skills
            </h3>
            <ul className="mt-2 max-h-48 overflow-auto space-y-1 text-sm">
              {roadmap.skills.map((s) => (
                <li key={s.id} className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      student.completedSkills.includes(s.id)
                        ? "bg-green-500"
                        : "bg-slate-300"
                    }`}
                  />
                  <span
                    className={
                      student.completedSkills.includes(s.id)
                        ? "text-slate-800"
                        : "text-slate-400"
                    }
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Progress Timeline
            </h3>
            <ul className="mt-2 max-h-48 overflow-auto space-y-2 text-sm">
              {student.progressHistory.map((p) => (
                <li
                  key={p.date}
                  className="flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <span>{new Date(p.date).toLocaleDateString()}</span>
                  <span className="font-medium">{p.progress}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
