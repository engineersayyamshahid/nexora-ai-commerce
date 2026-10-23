import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto px-4", className )}>
      {children}
    </div>
  );
};

export default Container;

// Think of a Container as a box that keeps all your website content aligned and prevents it from stretching across the entire screen.
// Without a container:
// -------------------------------------------------------------
// This text starts from the very left and goes to the very right.
// -------------------------------------------------------------

// With a container:

// -------------------------------------------------------------
//         This text stays nicely in the center
//         with space on both sides.
// -------------------------------------------------------------

// That's why almost every website has a container.