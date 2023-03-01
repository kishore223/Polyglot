import React, { useState, useEffect } from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import Cookies from "universal-cookie";
import { useNavigate, createSearchParams } from "react-router-dom";
import {API_BASE_URL} from "../../constants";

function Cards() {
  const cookieslog = new Cookies();
  const email = cookieslog.get("user");
  const navigate = useNavigate();

  const [langDashCode, setLangDashCode] = useState([]);
  const [langDash, setLangDash] = useState([]);
  const em = { email };
  const sa = [];
  const s = [];
  const [langCount, setLangCount] = useState(0);

  const getLanguage = () => {
    fetch(API_BASE_URL+"polyglot/player/getRegisteredLanguages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(em),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLangCount(Object.keys(responseJson.RegisteredLanguages).length);
        for (var i = 0; i < langCount; i++) {
          s.push(responseJson.RegisteredLanguages[i]["languageName"]);
          sa.push([
            responseJson.RegisteredLanguages[i]["languageName"],
            responseJson.RegisteredLanguages[i]["languageCode"],
          ]);
        }
        setLangDash(s);
        setLangDashCode(sa);
      });
  };

  useEffect(() => {
    getLanguage();
  });

  const cards = (e, languageId, language) => {
    const lang = { email, languageId };
    fetch(API_BASE_URL+"polyglot/player/assignLanguage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lang),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.errorCode === "10201") {
          navigate({
            pathname: "/Dashboard",
            search: createSearchParams({
              lang: language,
              languageId: languageId,
            }).toString(),
          });
        }
      });
  };

  return (
    <div>
      <div className="cards">
        {!(
          langDash.includes("Italian") &&
          langDash.includes("French") &&
          langDash.includes("Spanish")
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
                    cards(e, "2001", "Italian");
                  }}
                />
              )}
              {!langDash.includes("French") && (
                <CardItem
                  src="/images/learn-french-language-online-education-concept.jpg"
                  text="Learn French"
                  onClick={(e) => {
                    cards(e, "2002", "French");
                  }}
                />
              )}
              {!langDash.includes("Spanish") && (
                <CardItem
                  src="/images/learn-spanish-language-online-education-concept.jpg"
                  text="Learn Spanish"
                  onClick={(e) => {
                    cards(e, "2003", "Spanish");
                  }}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="cards">
        <h1 className="card-home">Enrolled Languages</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              {langDashCode.map((lan) => (
                <CardItem
                  className="card-item"
                  src={
                    "/images/learn-" +
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
