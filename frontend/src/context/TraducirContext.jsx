import { createContext, useContext, useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import messagesEs from "../translations/es.json";
import messagesEn from "../translations/en.json";

const TraducirContext = createContext();

export const TraducirProvider = ({ children }) => {
  localStorage.setItem("language", "es-ES")
  const [locale, setLocale] = useState(
    localStorage.getItem("language") || "es-ES"
  );

  useEffect(() => {
    localStorage.setItem("language", locale);
    //console.log("Idioma cambiado a: " + locale);
  }, [locale]);

  const messages = {
    "es-ES": messagesEs,
    "en-US": messagesEn,
  };

  const setSpanish = () => setLocale("es-ES");
  const setEnglish = () => setLocale("en-US");

  return (
    <TraducirContext.Provider value={{ locale, setSpanish, setEnglish }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </TraducirContext.Provider>
  );
};

export const useTraductor = () => useContext(TraducirContext);
