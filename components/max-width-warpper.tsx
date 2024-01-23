import { cn } from "@/lib/utils";
import React from "react";

export default function MaxWidthWrapper({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('mx-auto w-full max-w-screen-xl px-4', className)}>{children}</div>;
}
