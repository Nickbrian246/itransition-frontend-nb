"use client";
import React, { useEffect, useState } from "react";
import Collection from "./collection";
import CreateItemModalForm from "@/components/create-item-form";
import EmptyContent from "@/components/empty-content";
import Items from "./items";
import { getCollectionById, getItemsByCollectionId } from "../_services";
import { Collections } from "@/entities/collections";
import { Item } from "@/entities/item";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useAppSelector } from "@/hooks/use-redux/redux";

interface Props {
  slug: string;
}
export default function CollectionPage({ slug }: Props) {
  const [collection, setCollection] = useState<Collections | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { locale } = useAppSelector((state) => state.locale);
  const {
    user: { email, role },
  } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  useEffect(() => {
    updateData();
  }, [slug]);

  const updateData = () => {
    getCollectionById(slug)
      .then((res) => {
        console.log(res.data);
        setCollection(res.data);
      })
      .catch((err) => console.log(err));
    getItemsByCollectionId(slug)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {" "}
      {collection !== null && (
        <Collection
          user={collection.user}
          category={collection.category}
          date={collection.updatedAt}
          description={collection.description}
          id={collection.id}
          imgId={collection.imageId ?? ""}
          itemsCount={collection.items?.length ?? 0}
          title={collection.name}
          key={collection.id}
          locale={locale}
        />
      )}
      {(role === "ADMIN" || email === collection?.user.email) && (
        <Button
          sx={{ mt: "20px" }}
          variant="contained"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          {t("commons:createItem")}
        </Button>
      )}
      <CreateItemModalForm
        itemOwnerId={collection?.userId ?? undefined}
        open={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false);
        }}
        collectionId={slug}
        updateData={updateData}
      />
      {items.length === 0 ? (
        <EmptyContent text={t("commons:noItems")} />
      ) : (
        <Items items={items} />
      )}
    </>
  );
}
