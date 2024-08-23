import { Locale } from "@/types/types";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";

export function getCurrentFormatDate(locale: Locale) {
  const localeObject = locale === "es" ? es : enUS;
  return format(new Date(), "MM/dd/yyyy", { locale: localeObject });
}
