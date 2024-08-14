import { Collections } from "@/entities/collections";
import React from "react";
import CollectionCard from "../collection-card";
interface Props {
  collections: Collections[];
}
export default function LatestCollections({ collections }: Props) {
  return (
    <>
      {collections.map((collection) => (
        <CollectionCard
          date={collection.updatedAt}
          description={collection.description}
          itemsCount={collection.items ? collection.items.length : 0}
          imgId="hello"
          title={collection.name}
          key={collection.id}
          id={collection.id}
        />
      ))}
    </>
  );
}
