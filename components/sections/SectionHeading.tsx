export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm sm:text-base leading-7 text-neutral-700">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
