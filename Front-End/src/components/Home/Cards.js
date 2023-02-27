import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import Cookies from "universal-cookie";
import { useNavigate, createSearchParams } from "react-router-dom";

function Cards() {
  const cookieslog = new Cookies();
  const email = cookieslog.get("user");
  const navigate = useNavigate();

  const cards = (e, languageId, language) => {
    const lang = { email, languageId };
    fetch("http://localhost:8080/polyglot/player/assignLanguage", {
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
    <div className="cards">
      <h1 className="card-home">Select a Language</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              className="card-item"
              src="/images/learn-italian-language-online-education-concept.jpg"
              text="Learn Italian"
              onClick={(e) => {
                cards(e, "2001", "Italian");
              }}
            />
            <CardItem
              src="/images/learn-french-language-online-education-concept.jpg"
              text="Learn French"
              onClick={(e) => {
                cards(e, "2002", "French");
              }}
            />
            <CardItem
              src="/images/learn-spanish-language-online-education-concept.jpg"
              text="Learn Spanish"
              onClick={(e) => {
                cards(e, "2003", "Spanish");
              }}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
