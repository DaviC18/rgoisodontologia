import { cn } from "@/lib/cn";

type Props = { className?: string; strokeWidth?: number };

/** Dente em traço fino, desenho original. Ornamento: sempre decorativo. */
export function ToothMark({ className, strokeWidth = 1.5 }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-6", className)}
    >
      <path d="M15 7.5c-5.2 0-8.5 4-8.5 9.2 0 4.6 1.9 7.5 2.9 11.6 1.2 5 1.8 13.2 6 13.2 4.3 0 4.2-9.3 8.6-9.3s4.3 9.3 8.6 9.3c4.2 0 4.8-8.2 6-13.2 1-4.1 2.9-7 2.9-11.6 0-5.2-3.3-9.2-8.5-9.2-3.9 0-5.6 2.3-9 2.3s-5.1-2.3-9-2.3Z" />
      <path d="M13.2 14.2c-1.4 1-2 2.6-1.8 4.5" />
    </svg>
  );
}
