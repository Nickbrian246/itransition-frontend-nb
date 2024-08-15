import CollectionCardSkeleton from "@/components/skeletons/collection-card";
import React from "react";

export default function Skeleton() {
  const arr = new Array(10).fill("*");
  return (
    <>
      {arr.map((_, index) => (
        <CollectionCardSkeleton key={index} />
      ))}
    </>
  );
}
