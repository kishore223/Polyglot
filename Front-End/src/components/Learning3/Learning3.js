import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Learning1/Flashcard.css";
import FlashcardL1 from "../Learning1/FlashcardL1.js";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { API_BASE_URL } from "../../constants";

function Learning3() {
  const [searchparams] = useSearchParams();
  let score = useState(searchparams.get("score"));
  const language = searchparams.get("lang");
  const languageId = searchparams.get("languageId");
  const btnState = searchparams.get("btnState");
  const cookieslog = new Cookies();
  const email = cookieslog.get("user");
  const [headCards, setHeadCards] = useState([]);
  const [transCards, setTransCards] = useState([]);
  const [imagesCards, setImagesCards] = useState([]);
  const [langCount, setLangCount] = useState(0);
  const headings = [];
  const trans = [];
  const images = [];

  const getGame = () => {
    const game = {
      languageId,
      moduleId: 5,
    };
    fetch(API_BASE_URL + "polyglot/getGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLangCount(Object.keys(responseJson["game_first"]).length);
        for (var i = 0; i < langCount; i++) {
          headings.push(responseJson["game_first"][i]["englishVerb"]);
          trans.push(responseJson["game_first"][i]["translatedVerb"]);
          images.push(responseJson["game_first"][i]["urlImage"]);
        }
        setHeadCards(headings);
        setTransCards(trans);
        setImagesCards(images);
      });
  };

  const getJson = () => {
    const updScores = {
      email,
      languageId: languageId,
      moduleId: 6,
      newScore: 100 / langCount,
    };
    fetch(API_BASE_URL + "polyglot/player/updateModuleScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updScores),
    });
  };

  useEffect(() => {
    getGame();
    getJson();
  });

  return (
    <div>
      <div className="color-div">
        <h1 className="head-h1">LEARNING III</h1>
        {btnState === "Restart" && (
          <FlashcardL1
            headings={headCards}
            trans={transCards}
            images={imagesCards}
            language={language}
            languageId={languageId}
            moduleId="6"
            //descrp={["first"]}
            count={parseInt(score) / (100 / langCount)}
            score={100 / langCount}
            cardNo={langCount}
          ></FlashcardL1>
        )}
        {btnState === "Start" && (
          <FlashcardL1
            headings={headCards}
            trans={transCards}
            images={imagesCards}
            language={language}
            languageId={languageId}
            moduleId="6"
            count={parseInt(score) / (100 / langCount)}
            //descrp={["first"]}
            score={100 / langCount}
            cardNo={langCount}
          ></FlashcardL1>
        )}
        {btnState === "Resume" && (
          <FlashcardL1
            headings={headCards}
            trans={transCards}
            images={imagesCards}
            language={language}
            languageId={languageId}
            moduleId="6"
            //descrp={["first"]}
            count={parseInt(score) / (100 / parseInt(langCount)) - 1}
            score={score}
            cardNo={langCount}
          ></FlashcardL1>
        )}
      </div>
    </div>
  );
}
export default Learning3;
