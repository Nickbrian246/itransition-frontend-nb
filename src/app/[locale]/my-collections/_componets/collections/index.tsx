"use client";
import { Collections } from "@/entities/collections";
import EditableCollectionCard from "./components/editable-collection-card";
interface Props {
  collections: Collections[];
  handleRefreshCollections: () => void;
}

export default function MyCollections({
  collections,
  handleRefreshCollections,
}: Props) {
  return (
    <>
      {collections.map((collection) => (
        <EditableCollectionCard
          date={collection.updatedAt}
          description={collection.description}
          itemsCount={collection.items ? collection.items.length : 0}
          imgId={collection.imageId}
          title={collection.name}
          key={collection.id}
          id={collection.id}
          author={collection.author}
          editedBy={collection.editedBy}
          isEdited={collection.isEdited}
          categoryId={collection.categoryId}
          handleRefreshCollections={handleRefreshCollections}
          customFields={collection.customFields}
        />
      ))}
    </>
  );
}
