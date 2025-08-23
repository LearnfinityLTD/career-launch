export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-indigo-600 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
