/* --- file: app/demo/page.tsx --- */
"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function DemoPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "",
    role: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
        <p className="text-slate-600">
          We&apos;ve received your demo request. A member of our team will reach
          out shortly to schedule your session.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Schedule Your Strategic Demo
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Discover how CareerLaunch helps universities{" "}
          <span className="font-semibold text-slate-800">
            improve graduate employment rates
          </span>
          , boost league table rankings, and deliver{" "}
          <span className="font-semibold text-slate-800">
            measurable ROI for your institution
          </span>
          .
        </p>
      </div>

      {/* Value Props */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 text-sm">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold">Proven impact:</span> Universities
            using CareerLaunch report up to{" "}
            <span className="font-semibold">20% higher employment rates</span>.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold">League table advantage:</span>{" "}
            Strengthen rankings with transparent graduate outcomes data.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold">Effortless reporting:</span> Export
            TEF & accreditation-ready metrics in seconds.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Work Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">University</label>
            <input
              type="text"
              name="university"
              value={form.university}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Your Role / Department
            </label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Additional Notes
          </label>
          <textarea
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Request Demo
        </button>
      </form>
    </section>
  );
}
