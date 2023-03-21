import React, { useState, useEffect } from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";
import { email } from "../Functions/CommonScripts.js";
import { getRegisterLanguages, assignLang } from "../Functions/APIFunctions.js";

function Cards() {
  const navigate = useNavigate();
  const [langDashCode, setLangDashCode] = useState([]);
  const [langDash, setLangDash] = useState([]);
  const languageNameCode = [];
  const languageName = [];
  const [langCount, setLangCount] = useState(0);

  const getLanguage = () => {
    getRegisterLanguages(
      email,
      setLangCount,
      languageName,
      languageNameCode,
      langCount,
      setLangDash,
      setLangDashCode
    );
  };

  const cardsCheck = (e, languageId, language) => {
    assignLang(email, languageId, language, navigate);
  };

  useEffect(() => {
    getLanguage();
  });

  return (
    <div>
      <div className="cards">
        {!(
          langDash.includes("Italian") &&
          langDash.includes("French") &&
          langDash.includes("Spanish") &&
          langDash.includes("Swahili")
        ) && <h1 className="card-home">Select a Language</h1>}
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              {!langDash.includes("Italian") && (
                <CardItem
                  className="card-item"
                  src="/images/learn-italian-language-online-education-concept.jpg"
                  text="Learn Italian"
                  onClick={(e) => {
                    cardsCheck(e, "2001", "Italian");
                  }}
                />
              )}
              {!langDash.includes("French") && (
                <CardItem
                  className="card-item"
                  src="/images/learn-french-language-online-education-concept.jpg"
                  text="Learn French"
                  onClick={(e) => {
                    cardsCheck(e, "2002", "French");
                  }}
                />
              )}
              {!langDash.includes("Spanish") && (
                <CardItem
                  className="card-item"
                  src="/images/learn-spanish-language-online-education-concept.jpg"
                  text="Learn Spanish"
                  onClick={(e) => {
                    cardsCheck(e, "2003", "Spanish");
                  }}
                />
              )}
              {!langDash.includes("Swahili") && (
                <CardItem
                  className="card-item"
                  src="/images/learn-swahili-language-online-education-concept.png"
                  text="Learn Swahili"
                  onClick={(e) => {
                    cardsCheck(e, "2004", "Swahili");
                  }}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="cards">
        {(langDash.includes("Italian") ||
          langDash.includes("French") ||
          langDash.includes("Spanish") ||
          langDash.includes("Swahili")) && (
          <h1 className="card-home">Enrolled Languages</h1>
        )}
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              {langDashCode.map((lan) => (
                <CardItem
                  key={lan[0]}
                  className="card-item"
                  src={
                    lan[0] === "Swahili"
                      ? "/images/learn-swahili-language-online-education-concept.png"
                      : "/images/learn-" +
                        lan[0] +
                        "-language-online-education-concept.jpg"
                  }
                  text={"Learn " + lan[0]}
                  onClick={(e) => {
                    navigate(
                      "/Dashboard?lang=" + lan[0] + "&languageId=" + lan[1]
                    );
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
