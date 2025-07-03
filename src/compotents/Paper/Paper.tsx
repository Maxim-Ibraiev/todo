import type { PropsWithChildren } from "react";

export default function Paper({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`w-fit p-3 bg-white shadow rounded-xl ${className}`}>{children}</div>;
}
