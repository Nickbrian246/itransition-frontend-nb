import { Locale } from "@/types/types";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { es, enUS } from "date-fns/locale";

export function timeFromNow(date: Date, locale: Locale) {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: locale === "en" ? enUS : es,
  });
}
