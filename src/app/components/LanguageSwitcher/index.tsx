"use client";
import i18n from "../../../i18n/config";

export default function LanguageSwitcher () {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const language = i18n.language;

  return (
    <select
      value={language}
      className="bg-gray-300 hover:bg-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold py-1 px-2 rounded-md"
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="en">
        En
      </option>
      <option value="pt">
        Pt
      </option>
      <option value="es">
        Es
      </option>
      <option value="fr">
        Fr
      </option>
    </select>
  );
};