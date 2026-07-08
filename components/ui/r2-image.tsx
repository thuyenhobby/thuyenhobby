"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type R2ImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  fallbackLabel: string;
  fallbackClassName?: string;
};

export function R2Image({ alt, fallbackLabel, fallbackClassName, onError, ...props }: R2ImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={cn("flex h-full w-full items-center justify-center text-center", fallbackClassName)}>
        {fallbackLabel}
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      onError={(event) => {
        setHasError(true);
        onError?.(event);
      }}
    />
  );
}
