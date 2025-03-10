import { useTraductor } from "../../../../context/TraducirContext";

export const ButtonsSelectorLenguaje = () => {
    const {setSpanish, setEnglish, locale} = useTraductor()
  

  return (
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input
        type="radio"
        className="btn-check"
        name="btnlang"
        id="btnspanish"
        autoComplete="off"
        value="es"
        checked={locale === "es-ES"}
        onChange={() =>setSpanish()}
      />
      <label className="btn btn-outline-success" htmlFor="btnspanish">ES</label>

      <input
        type="radio"
        className="btn-check"
        name="btnlang"
        id="btnenglish"
        autoComplete="off"
        value="en"
        checked={locale === "en-US"}
        onChange={() =>setEnglish()}
      />
      <label className="btn btn-outline-success" htmlFor="btnenglish">EN</label>
    </div>
  );
};
