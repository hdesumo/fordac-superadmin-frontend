"use client";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const current = pathname.split("/")[1] || "fr";

  const switchLang = (lang: string) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/`;
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLang("fr")}
        className={`px-2 ${current === "fr" ? "font-bold underline" : ""}`}
      >
        FR
      </button>
      |
      <button
        onClick={() => switchLang("en")}
        className={`px-2 ${current === "en" ? "font-bold underline" : ""}`}
      >
        EN
      </button>
    </div>
  );
}
