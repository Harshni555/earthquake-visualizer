import React from "react";

export default function Skeleton({
  height = "20px",
  width = "100%",
  className = "",
}: {
  height?: string;
  width?: string;
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] ${className}`}
      style={{ height, width }}
    />
  );
}
