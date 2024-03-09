import i18n from "../../i18n/config";
import ReactCountryFlag from "react-country-flag";

const LanguageSwitcher: React.FC = () => {
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
      <ReactCountryFlag countryCode="US" />
    </option>
    <option value="pt">
      <ReactCountryFlag countryCode="BR" />
    </option>
    <option value="es">
      <ReactCountryFlag countryCode="ES" />
    </option>
    <option value="fr">
      <ReactCountryFlag countryCode="FR" />
    </option>
  </select>
  );
};

export default LanguageSwitcher;