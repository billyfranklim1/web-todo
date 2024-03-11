import i18n from "../../i18n/config";
import { useEffect } from "react";

export default function LanguageSwitcher() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    if (lng) {
      i18n.changeLanguage(lng);
    }
  }, []);

  const language = i18n.language;

  return (
    <select
      value={language}
      className="bg-gray-300 hover:bg-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold py-1 px-2 rounded-md"
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="en">EN</option>
      <option value="pt">PT</option>
      <option value="es">ES</option>
      <option value="fr">FR</option>
    </select>
  );
}
