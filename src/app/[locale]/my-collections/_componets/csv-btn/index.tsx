"use client";
import { Collections } from "@/entities/collections";
import { useAppSelector } from "@/hooks/use-redux/redux";
import { getCurrentFormatDate } from "@/utils/date/current-date";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
type Collection = Pick<
  Collections,
  "author" | "imageId" | "name" | "description" | "updatedAt" | "user"
>;
interface Props {
  collection: Collection[];
}
export default function CsvButton({ collection }: Props) {
  const { t } = useTranslation();
  const [headers, setHeader] = useState<{ label: string; key: string }[]>([]);
  const [usersCsv, setUsersCsv] = useState<Omit<Collection, "user">[]>([]);
  const { locale } = useAppSelector((state) => state.locale);
  const [collectionOwner, setCollectionOwner] = useState<string>("");

  useEffect(() => {
    if (collection) setCollectionOwner(collection[0].user.firstName);
  }, []);
  const handleClick = () => {
    const localeHeaders: { label: string; key: string }[] = [];
    const adapter = collection.map((c) => {
      return {
        author: c.author.firstName,
        updatedAt: c.updatedAt,
        imageId: c.imageId,
        description: c.description,
        name: c.name,
      };
    });
    const keys = Object.keys(adapter[0]);

    for (let key of keys) {
      localeHeaders.push({
        label: t(`collection:${key}`),
        key,
      });
    }

    setHeader(localeHeaders);
    //@ts-ignore
    setUsersCsv(adapter);
  };

  return (
    <>
      <CSVLink
        style={{
          padding: "10px",
          textDecoration: "none",
          background: "green",
          color: "white",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(event, done) => {
          handleClick();
        }}
        data={usersCsv}
        headers={headers}
        filename={`${t("commons:collection")}-${t(
          "collection:of"
        )} ${collectionOwner}-${getCurrentFormatDate(locale)}.csv`}
      >
        {t("commons:exportCsv")}
      </CSVLink>
    </>
  );
}
