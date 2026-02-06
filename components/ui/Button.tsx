import Link from "next/link";
import clsx from "clsx";

type Props =
  | { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }
  | { onClick?: () => void; children: React.ReactNode; variant?: "primary" | "ghost" };

export default function Button(props: Props) {
  const variant = "variant" in props && props.variant ? props.variant : "primary";

  const className = clsx(
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
    "focus:outline-none focus:ring-2 focus:ring-emerald-200",
    variant === "primary" &&
      "bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm",
    variant === "ghost" &&
      "bg-transparent text-neutral-900 hover:bg-neutral-100"
  );

  if ("href" in props) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }
  return (
    <button onClick={props.onClick} className={className}>
      {props.children}
    </button>
  );
}
