import { tr } from "@/messages/tr";
import { en } from "@/messages/en";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

// Aynı anahtar yapısı, farklı string değerler; tipi tr yapısına göre veriyoruz
const messages = { tr, en } as unknown as Record<Locale, typeof tr>;

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages.tr;
}

export function getT(locale: Locale) {
  const m = getMessages(locale);
  return function t(key: string): string {
    const parts = key.split(".");
    let value: unknown = m;
    for (const part of parts) {
      if (value && typeof value === "object" && part in value) {
        value = (value as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };
}

export const defaultLocale: Locale = "tr";
