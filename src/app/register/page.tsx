"use client";

import { useState } from "react";
import { sampleStudents, Student } from "../../lib/demoData";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    course: "",
    graduationYear: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: Date.now().toString(),
      name: form.name,
      course: form.course,
      graduationYear: parseInt(form.graduationYear, 10),
      roadmap: "frontend", // default for demo
      progress: 0,
      progressHistory: [{ date: new Date().toISOString(), progress: 0 }], // ✅ fixed: use string
      employmentStatus: "Seeking", // ✅ default outcome
      completedSkills: [], // ✅ no skills yet
    };

    const stored = JSON.parse(localStorage.getItem("students") || "[]");
    localStorage.setItem("students", JSON.stringify([...stored, newStudent]));
    alert("Student registered!");
    setForm({ name: "", course: "", graduationYear: "" });
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Register as a Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
          required
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="number"
          name="graduationYear"
          placeholder="Graduation Year"
          value={form.graduationYear}
          onChange={handleChange}
          required
          className="w-full rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Register
        </button>
      </form>
    </section>
  );
}
