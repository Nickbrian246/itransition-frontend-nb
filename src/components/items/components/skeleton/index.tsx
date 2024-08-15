import React from "react";
import ItemCardNoImgSkeleton from "@/components/skeletons/item-card/item-card-no-img";
import CollectionCardSkeleton from "@/components/skeletons/collection-card";
export default function Skeletons() {
  const arr = new Array(5).fill("*");
  return (
    <>
      {arr.map((_, index) => (
        <ItemCardNoImgSkeleton key={index} />
      ))}
    </>
  );
}
