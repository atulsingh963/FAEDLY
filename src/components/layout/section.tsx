import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
}

export function Section({
  className,
  children,
  id,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24 lg:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}
