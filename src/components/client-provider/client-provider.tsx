import React, { ReactNode } from "react";

export default function ClientComponent({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return <section>{children}</section>;
}
