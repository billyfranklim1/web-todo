import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import DarkModeSwitcher from "../DarkModeSwitcher";

export default function  Header () {
  const { t } = useTranslation();

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t("Todo List")}
      </h1>
      <div className="flex gap-2 items-center">
        <LanguageSwitcher />
        <DarkModeSwitcher />
      </div>
    </header>
    
  );
};