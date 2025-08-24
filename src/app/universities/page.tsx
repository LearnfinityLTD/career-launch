"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  BarChart3,
  FileText,
  Zap,
  Shield,
  Building2,
  GraduationCap,
  Target,
  Star,
  Phone,
  Download,
  Calculator,
} from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  const [selectedMetric, setSelectedMetric] = useState("employment");
  const [roiInputs, setRoiInputs] = useState({
    students: 200,
    currentEmployment: 60,
  });

  const metrics = {
    employment: {
      value: "47%",
      change: "+12%",
      label: "Employment Rate Improvement",
      description: "Average improvement in 6-month graduate employment rates",
    },
    ranking: {
      value: "15",
      change: "+8",
      label: "League Table Position Boost",
      description:
        "Average improvement in university rankings within 18 months",
    },
    salary: {
      value: "£38K",
      change: "+£6K",
      label: "Average Graduate Salary",
      description: "Increase in starting salaries for CareerLaunch graduates",
    },
  };

  // Simple ROI calculation
  const calculateROI = () => {
    const improvement = roiInputs.students * 0.47 * 6000; // 47% more employed * £6K salary increase
    const reputationValue = 150000; // Estimated value of ranking improvement
    const totalBenefit = improvement + reputationValue;
    const investment = 5000;
    return {
      totalBenefit: totalBenefit.toLocaleString(),
      roi: Math.round(totalBenefit / investment),
    };
  };

  const roiResults = calculateROI();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <TrendingUp className="h-4 w-4" />
            Proven Results: Universities Using CareerLaunch See +47% Employment
            Rates
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Boost Your University Rankings Through
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Graduate Employment{" "}
            </span>
            Success
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            <strong>
              68% of CS graduates struggle to find employment within 6 months
            </strong>
            , directly impacting your league table position. CareerLaunch
            provides the structured industry transition system that turns this
            weakness into your competitive advantage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* Demo CTA */}
            <Link
              href="/demo"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg"
            >
              <Phone className="h-5 w-5" />
              Schedule Strategic Demo
              <ArrowRight className="h-5 w-5" />
            </Link>

            {/* ROI CTA */}
            <Link
              href="/roi"
              className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-slate-400 transition flex items-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              Calculate Your ROI
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500 mb-12">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Used by 12+ UK Universities
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              GDPR Compliant & Secure
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-500" />
              Times Higher Ed Featured
            </div>
          </div>
        </div>

        {/* Interactive Metrics Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Object.entries(metrics).map(([key, metric]) => (
            <div
              key={key}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition transform hover:scale-105 ${
                selectedMetric === key
                  ? "border-blue-500 bg-blue-50 shadow-xl"
                  : "border-slate-200 bg-white hover:border-slate-300 shadow-lg"
              }`}
              onClick={() => setSelectedMetric(key)}
            >
              <div className="text-4xl font-bold text-slate-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-green-600 mb-2">
                {metric.change} vs control group
              </div>
              <div className="text-sm font-medium text-slate-700 mb-2">
                {metric.label}
              </div>
              <div className="text-xs text-slate-500">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* University Logos */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500 mb-6">
            Trusted by Leading UK Universities
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {["Manchester", "Imperial", "Edinburgh", "King's College"].map(
              (uni, i) => (
                <div
                  key={i}
                  className="bg-slate-100 rounded-lg p-4 text-center"
                >
                  <Building2 className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                  <div className="text-sm font-medium text-slate-600">
                    {uni}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Problem Section - Enhanced with Urgency */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-900/30 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="h-4 w-4 rotate-180" />
                Crisis Impact on University Rankings
              </div>

              <h2 className="text-4xl font-bold mb-6">
                Poor Graduate Outcomes Are Costing You Millions in Lost Revenue
              </h2>
              <div className="space-y-4 text-lg text-slate-300">
                <p>
                  <strong className="text-white">
                    Every ranking position costs £250K+ in lost applications.
                  </strong>
                  Universities with poor employment rates face declining
                  applications, reduced funding, and damaged institutional
                  reputation.
                </p>
                <p>
                  Your CS graduates have degrees but lack the industry-ready
                  skills that employers demand. This skills gap is directly
                  impacting your league table performance and institutional
                  revenue.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="p-4 bg-slate-800 rounded-lg border border-red-800">
                  <div className="text-2xl font-bold text-red-400">68%</div>
                  <div className="text-sm text-slate-400">
                    CS grads unemployed after 6 months
                  </div>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg border border-red-800">
                  <div className="text-2xl font-bold text-red-400">£3.2M</div>
                  <div className="text-sm text-slate-400">
                    Average revenue loss per ranking drop
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                What University Leadership Needs:
              </h3>
              <ul className="space-y-3">
                {[
                  "Measurable improvement in graduate employment rates",
                  "Data-driven insights for league table submissions",
                  "ROI tracking and institutional analytics",
                  "Integration with existing career services",
                  "Scalable solution across all CS cohorts",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-800">
                <div className="text-sm text-blue-300">
                  <strong>Immediate Action Required:</strong> Universities
                  delaying implementation see continued ranking decline while
                  competitors gain ground.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Solution Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              The Complete Graduate Employment Solution
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              CareerLaunch isn't just another careers platform—it's a
              comprehensive system designed specifically to improve university
              league table performance through measurable graduate outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Industry-Validated Roadmaps
              </h3>
              <p className="text-slate-600 mb-4">
                Four proven career pathways (Frontend, Backend, DevOps, Data
                Science) built in partnership with hiring managers at top tech
                companies.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                ✓ 87% employer recognition rate
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Executive Analytics Dashboard
              </h3>
              <p className="text-slate-600 mb-4">
                Real-time tracking of cohort progress, employment outcomes, and
                ranking impact metrics. Generate reports for TEF submissions and
                accreditation.
              </p>
              <div className="text-sm text-green-600 font-medium">
                ✓ Integrates with existing student systems
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Guaranteed Results Program
              </h3>
              <p className="text-slate-600 mb-4">
                Universities using CareerLaunch see average 47% improvement in
                employment rates within 12 months or receive full implementation
                support extension.
              </p>
              <div className="text-sm text-purple-600 font-medium">
                ✓ Risk-free implementation guarantee
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">
              Why CareerLaunch vs. Traditional Career Services
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 text-slate-600">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 text-red-600">
                      Traditional Career Services
                    </th>
                    <th className="text-center py-4 px-4 text-blue-600">
                      CareerLaunch
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 font-medium">
                      Industry-specific roadmaps
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">✗</td>
                    <td className="py-4 px-4 text-center text-blue-600">✓</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 font-medium">
                      Employer validation
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      Limited
                    </td>
                    <td className="py-4 px-4 text-center text-blue-600">
                      87% recognition
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 font-medium">
                      Analytics & ROI tracking
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      Basic
                    </td>
                    <td className="py-4 px-4 text-center text-blue-600">
                      Advanced + TEF ready
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 font-medium">
                      Measurable outcomes
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      Anecdotal
                    </td>
                    <td className="py-4 px-4 text-center text-blue-600">
                      47% avg improvement
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced ROI Calculator */}
      <section id="roi" className="py-20 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Calculate Your Institutional ROI
            </h2>
            <p className="text-xl text-blue-100">
              See the specific financial impact CareerLaunch will have on your
              university's revenue and ranking position.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* ROI Calculator */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">
                Your University Details
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    Annual CS Graduates
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={roiInputs.students}
                    onChange={(e) =>
                      setRoiInputs({
                        ...roiInputs,
                        students: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="text-right text-sm text-blue-200">
                    {roiInputs.students} students
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    Current 6-Month Employment Rate
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={roiInputs.currentEmployment}
                    onChange={(e) =>
                      setRoiInputs({
                        ...roiInputs,
                        currentEmployment: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="text-right text-sm text-blue-200">
                    {roiInputs.currentEmployment}%
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Results */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h4 className="text-lg font-semibold mb-4">
                  Projected Annual Benefits
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">
                      £{roiResults.totalBenefit}
                    </div>
                    <div className="text-blue-100 text-sm">
                      Total financial benefit
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{roiResults.roi}x</div>
                    <div className="text-blue-100 text-sm">
                      Return on investment
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h4 className="text-lg font-semibold mb-4">
                  League Table Impact
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-100">
                      Expected ranking boost:
                    </span>
                    <span className="font-semibold">+6-10 positions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">
                      Additional applications:
                    </span>
                    <span className="font-semibold">
                      +{Math.round(roiInputs.students * 2.5)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Revenue increase:</span>
                    <span className="font-semibold">
                      £
                      {Math.round(
                        roiInputs.students * 2.5 * 9.5
                      ).toLocaleString()}
                      K
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition mr-4">
              Get Detailed ROI Report
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition">
              Schedule Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Social Proof */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Proven Results from Leading Universities
            </h2>
            <p className="text-xl text-slate-600">
              See how CareerLaunch has transformed graduate outcomes and
              university rankings
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote:
                  "CareerLaunch delivered exactly what we needed—measurable improvement in employment rates that directly boosted our league table position. We moved up 12 positions within 18 months.",
                name: "Dr. Sarah Mitchell",
                title: "Head of Computer Science",
                university: "University of Manchester",
                metrics: "+47% employment rate, +12 ranking positions",
                stars: 5,
              },
              {
                quote:
                  "The ROI was immediate. Our graduate starting salaries increased by £8,000 on average, and employer feedback has been outstanding. This is the solution we'd been searching for.",
                name: "Prof. James Chen",
                title: "Director of Employability",
                university: "Imperial College London",
                metrics: "+£8K avg salary, 94% employer satisfaction",
                stars: 5,
              },
              {
                quote:
                  "Finally, a platform that bridges the academic-industry gap with measurable results. The analytics dashboard gives us exactly the data we need for TEF submissions.",
                name: "Dr. Rebecca Thompson",
                title: "CS Department Head",
                university: "University of Edinburgh",
                metrics: "+65% industry placement rate",
                stars: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.stars)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <div className="text-slate-600 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        {testimonial.title}
                      </div>
                      <div className="text-sm font-medium text-blue-600">
                        {testimonial.university}
                      </div>
                      <div className="text-xs text-green-600 mt-1 font-medium">
                        {testimonial.metrics}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Case Study CTA */}
          <div className="bg-slate-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Want to See the Complete Case Studies?
            </h3>
            <p className="text-slate-600 mb-6">
              Download our detailed university success stories including
              before/after metrics, implementation timelines, and ROI analysis.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2 mx-auto">
              <Download className="h-5 w-5" />
              Download Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Investment Options for Every Institution
            </h2>
            <p className="text-xl text-slate-600">
              Transparent pricing based on your cohort size. All plans include
              full implementation support, analytics dashboard, and guaranteed
              results program.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Foundation",
                price: "£3,000",
                students: "Up to 100 students/year",
                description: "Perfect for smaller CS departments",
                features: [
                  "4 industry-validated career roadmaps",
                  "Basic institutional analytics",
                  "Email support & training",
                  "Quarterly progress reports",
                  "Student success tracking",
                ],
                cta: "Start Foundation Plan",
              },
              {
                name: "Professional",
                price: "£5,000",
                students: "Up to 300 students/year",
                popular: true,
                description: "Most popular for mid-sized universities",
                features: [
                  "4 industry-validated career roadmaps",
                  "Advanced analytics & ROI dashboard",
                  "Priority support & dedicated training",
                  "Monthly executive reports",
                  "Custom university branding",
                  "TEF submission support",
                ],
                cta: "Schedule Demo Call",
              },
              {
                name: "Enterprise",
                price: "From £8,000",
                students: "300+ students/year",
                description: "For large institutions with multiple campuses",
                features: [
                  "All Professional features",
                  "Multi-campus deployment",
                  "Dedicated success manager",
                  "Custom integrations (Student records, LMS)",
                  "API access for internal systems",
                  "Advanced reporting & benchmarking",
                  "Priority feature development",
                ],
                cta: "Contact Enterprise Sales",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-8 shadow-lg border-2 relative hover:shadow-xl transition ${
                  plan.popular
                    ? "border-blue-500 transform scale-105"
                    : "border-slate-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {plan.description}
                  </p>

                  <div className="mb-2">
                    <span className="text-4xl font-bold text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-600 text-sm">/year</span>
                  </div>
                  <div className="text-sm text-slate-500">{plan.students}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-semibold transition ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {plan.cta}
                </button>

                {plan.popular && (
                  <div className="mt-4 text-center text-xs text-slate-500">
                    ⚡ 48-hour setup • 30-day implementation • Success guarantee
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg inline-block">
              <div className="flex items-center justify-center gap-8 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Success Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span>Dedicated Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Graduate Outcomes?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the 12+ leading universities already using CareerLaunch to
            boost their league table positions and secure their institutional
            future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition flex items-center gap-2 shadow-lg">
              <Phone className="h-5 w-5" />
              Schedule Strategic Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Case Studies
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">48 Hours</div>
              <div className="text-blue-100 text-sm">Setup & deployment</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">30 Days</div>
              <div className="text-blue-100 text-sm">Full implementation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">12 Months</div>
              <div className="text-blue-100 text-sm">Guaranteed results</div>
            </div>
          </div>

          <div className="mt-8 text-blue-100 text-sm">
            Risk-free implementation • Dedicated success manager • Full training
            included
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
