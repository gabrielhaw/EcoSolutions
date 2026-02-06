export default function Card({
  title,
  children,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      {eyebrow ? (
        <p className="text-xs font-medium tracking-wide text-emerald-700">{eyebrow}</p>
      ) : null}
      <h3 className="mt-2 text-base font-semibold text-neutral-900">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-neutral-700">{children}</div>
    </div>
  );
}
