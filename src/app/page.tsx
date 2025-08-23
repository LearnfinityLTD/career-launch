import Link from "next/link";

const roadmaps = [
  { slug: "frontend", title: "Frontend Developer" },
  { slug: "backend", title: "Backend Developer" },
  { slug: "devops", title: "DevOps Engineer" },
  { slug: "datascience", title: "Data Scientist" },
];

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-10 text-center">
        CS Graduate Career Transition Roadmaps
      </h1>
      <p className="mb-20 text-gray-600 text-center">
        Select a roadmap and start tracking your progress across
        industry-relevant skills and projects.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {roadmaps.map((rm) => (
          <Link
            key={rm.slug}
            href={`/roadmap/${rm.slug}`}
            className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{rm.title}</h2>
            <p className="mt-2 text-sm text-gray-500">View roadmap →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
