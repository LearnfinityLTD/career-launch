/* --- file: app/roi/page.tsx --- */
"use client";

import { useState } from "react";

export default function ROIPage() {
  const [graduates, setGraduates] = useState<number>(200);
  const [uplift, setUplift] = useState<number>(10); // %
  const [salary, setSalary] = useState<number>(5000); // £
  const [investment, setInvestment] = useState<number>(5000); // £
  const [calculated, setCalculated] = useState<null | {
    extraEmployed: number;
    annualBenefit: number;
    roi: number;
  }>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const extraEmployed = Math.round((graduates * uplift) / 100);
    const annualBenefit = extraEmployed * salary;
    const roi = investment > 0 ? annualBenefit / investment : 0;
    setCalculated({ extraEmployed, annualBenefit, roi });
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">ROI Calculator</h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Estimate the financial impact of improving graduate outcomes at your
          university. Adjust the figures below to model how CareerLaunch could
          enhance employability and deliver measurable returns.
        </p>
      </div>

      {/* ROI Form */}
      <form
        onSubmit={calculate}
        className="bg-white rounded-xl shadow p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Graduates per Year
          </label>
          <input
            type="number"
            value={graduates}
            onChange={(e) => setGraduates(Number(e.target.value))}
            className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Employability Uplift (%){" "}
            <span className="text-slate-400">(e.g. 10%)</span>
          </label>
          <input
            type="number"
            value={uplift}
            onChange={(e) => setUplift(Number(e.target.value))}
            className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Average Graduate Salary Uplift (£)
          </label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Annual Investment (£)
          </label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Calculate ROI
        </button>
      </form>

      {/* Results */}
      {calculated && (
        <div className="mt-8 rounded-xl border bg-blue-50 p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Your Results</h2>
          <p className="text-slate-700 mb-4">
            An improvement of <span className="font-semibold">{uplift}%</span>{" "}
            means approximately{" "}
            <span className="font-semibold">{calculated.extraEmployed}</span>{" "}
            more graduates employed.
          </p>
          <p className="text-lg text-slate-800 mb-2">
            Estimated additional graduate earnings:{" "}
            <span className="font-semibold">
              £{calculated.annualBenefit.toLocaleString()}
            </span>{" "}
            per year
          </p>
          <p className="text-xl font-semibold text-blue-700">
            ROI Multiple: {calculated.roi.toFixed(1)}x
          </p>
        </div>
      )}
    </section>
  );
}
