"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
interface Props {
  usersSelected: any[];
}
export default function VisitUserBtn({ usersSelected }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/my-collections/${usersSelected[0]}`);
  };
  return (
    <Button
      onClick={handleClick}
      disabled={!(usersSelected.length > 0 && usersSelected.length < 2)}
      sx={{ bgcolor: "#1565c0" }}
      variant="contained"
    >
      Visit user{" "}
    </Button>
  );
}
