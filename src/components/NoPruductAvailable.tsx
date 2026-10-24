
"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { PackageOpen } from "lucide-react";

const NoProductAvailable = ({
  selectedTab,
  className,
}: {
  selectedTab?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mt-10 flex min-h-80 w-full flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 py-10 text-center",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PackageOpen className="mx-auto h-12 w-12 text-gray-400" />

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
          No Products Available
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600"
      >
        We&apos;re sorry, but there are no products matching{" "}
        <span className="font-semibold text-darkColor">
          {selectedTab || "your selected"}
        </span>{" "}
        criteria at the moment.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500"
      >
        Please check back later or explore other product categories.
      </motion.p>
    </div>
  );
};

export default NoProductAvailable;
