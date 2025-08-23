export function KPICard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="text-sm font-medium text-slate-600">{title}</h2>
      <p className="mt-2 text-3xl font-bold text-indigo-600">{value}</p>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
