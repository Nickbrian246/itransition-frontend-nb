"use client";
import { User } from "@/entities/user";
import { useAppSelector } from "@/hooks/use-redux/redux";
import { getCurrentFormatDate } from "@/utils/date/current-date";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

type UserCsv = Omit<User, "userPreferences" | "password">[];
interface Props {
  users: UserCsv;
}
export default function CsvButton({ users }: Props) {
  const { t } = useTranslation();
  const [headers, setHeader] = useState<{ label: string; key: string }[]>([]);
  const [usersCsv, setUsersCsv] = useState<UserCsv>([]);
  const { locale } = useAppSelector((state) => state.locale);

  const handleClick = () => {
    const localeHeaders: { label: string; key: string }[] = [];
    const keys = Object.keys(users[0]);

    for (let key of keys) {
      if (key === "userPreferences" || key === "password" || key === "id")
        continue;
      localeHeaders.push({
        label: t(`userHeaders:${key}`),
        key,
      });
    }

    setHeader(localeHeaders);
    setUsersCsv(users);
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
        }}
        onClick={(event, done) => {
          handleClick();
        }}
        data={usersCsv}
        headers={headers}
        filename={`users-${getCurrentFormatDate(locale)}.csv`}
      >
        {t("commons:exportCsv")}
      </CSVLink>
    </>
  );
}
