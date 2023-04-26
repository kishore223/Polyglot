import React, { useState, useEffect } from "react";
import "./Cards.css";
import CardItem from "./CardItem.js";
import { useNavigate, createSearchParams } from "react-router-dom";
import { email } from "../Functions/CommonScripts.js";
import { getRegisterLanguages, assignLang } from "../Functions/APIFunctions.js";

function Cards() {
  const navigate = useNavigate();
  const [langDash, setLangDash] = useState([]);
  const languageNameCode = [];
  const languageName = [];
  const [langCount, setLangCount] = useState(0);

  const cardsCheck = (e, languageId, language) => {
    assignLang(email, languageId, language, navigate);
  };

  useEffect(() => {
    getRegisterLanguages(
      email,
      setLangCount,
      languageName,
      languageNameCode,
      langCount,
      setLangDash
    );
  }, [langCount]);

  return (
    <div>
      <div className="cards">
        <h1 className="card-home">Languages</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              <div className="row">
                {!langDash.includes("Italian") && (
                  <CardItem
                    className="card-item"
                    src="/images/learn-italian-language-online-education-concept.jpg"
                    text="Learn Italian"
                    btnText="ENROLL"
                    onClick={(e) => {
                      cardsCheck(e, "2001", "Italian");
                    }}
                  />
                )}
                {langDash.includes("Italian") && (
                  <CardItem
                    className="card-item"
                    src="/images/learn-italian-language-online-education-concept.jpg"
                    text="Learn Italian"
                    btnText="RESUME"
                    onClick={(e) => {
                      navigate({
                        pathname: "/Dashboard",
                        search: createSearchParams({
                          lang: "Italian",
                          languageId: "2001",
                        }).toString(),
                      });
                    }}
                  />
                )}
                {!langDash.includes("French") && (
                  <CardItem
                    className="card-item"
                    src="/images/learn-french-language-online-education-concept.jpg"
                    text="Learn French"
                    btnText="ENROLL"
                    onClick={(e) => {
                      cardsCheck(e, "2002", "French");
                    }}
                  />
                )}
                {langDash.includes("French") && (
                  <CardItem
                    className="card-item"
                    src="/images/learn-french-language-online-education-concept.jpg"
                    text="Learn French"
                    btnText="RESUME"
                    onClick={(e) => {
                      navigate({
                        pathname: "/Dashboard",
                        search: createSearchParams({
                          lang: "French",
                          languageId: "2002",
                        }).toString(),
                      });
                    }}
                  />
                )}
                {!langDash.includes("Spanish") && (
                  <CardItem
                    className="card-item"
                    src="/images/learn-spanish-language-online-education-concept.jpg"
                    text="Learn Spanish"
                    btnText="ENROLL"
                    onClick={(e) => {
                      cardsCheck(e, "2003", "Spanish");
                    }}
                  />
                )}
                {langDash.includes("Spanish") && (
                  <CardItem
                    className="card-item"
                    src="/images/learn-spanish-language-online-education-concept.jpg"
                    text="Learn Spanish"
                    btnText="RESUME"
                    onClick={(e) => {
                      navigate({
                        pathname: "/Dashboard",
                        search: createSearchParams({
                          lang: "Spanish",
                          languageId: "2003",
                        }).toString(),
                      });
                    }}
                  />
                )}
                {!langDash.includes("Swahili") && (
                  <CardItem
                    className="card-item"
                    src="/images/learn-swahili-language-online-education-concept.jpg"
                    text="Learn Swahili"
                    btnText="ENROLL"
                    onClick={(e) => {
                      cardsCheck(e, "2004", "Swahili");
                    }}
                  />
                )}
                {langDash.includes("Swahili") && (
                  <CardItem
                    className="card-item"
                    src="/images/learn-swahili-language-online-education-concept.jpg"
                    text="Learn Swahili"
                    btnText="RESUME"
                    onClick={(e) => {
                      navigate({
                        pathname: "/Dashboard",
                        search: createSearchParams({
                          lang: "Swahili",
                          languageId: "2004",
                        }).toString(),
                      });
                    }}
                  />
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
