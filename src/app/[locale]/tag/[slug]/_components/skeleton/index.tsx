import React from "react";
import ItemCardNoImgSkeleton from "@/components/skeletons/item-card/item-card-no-img";
import MuiSkeleton from "@mui/material/Skeleton";
export default function Skeleton() {
  const arr = new Array(8).fill("*");
  return (
    <>
      <MuiSkeleton animation="wave" />
      {arr.map((_, index) => (
        <ItemCardNoImgSkeleton key={index} />
      ))}
    </>
  );
}
