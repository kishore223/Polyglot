import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Flashcard.css";
import Flashcard from "./Flashcard.js";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import {API_BASE_URL} from "../constants";

function Learning1() {
  const [searchparams] = useSearchParams();
  let [score, getScore] = useState(searchparams.get("score"));
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
      moduleId: 1,
    };
    fetch(API_BASE_URL+"polyglot/getGame", {
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
      moduleId: 2,
      newScore: 100 / langCount,
    };
    fetch(API_BASE_URL+"polyglot/player/updateModuleScore", {
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
      {btnState === "Restart" && (
        <Flashcard
          headings={headCards}
          trans={transCards}
          images={imagesCards}
          language={language}
          languageId={languageId}
          //descrp={["first"]}
          count={parseInt(score) / (100 / langCount)}
          score={100 / langCount}
          cardNo={langCount}
        ></Flashcard>
      )}
      {btnState === "Start" && (
        <Flashcard
          headings={headCards}
          trans={transCards}
          images={imagesCards}
          language={language}
          languageId={languageId}
          count={parseInt(score) / (100 / langCount)}
          //descrp={["first"]}
          score={100 / langCount}
          cardNo={langCount}
        ></Flashcard>
      )}
      {btnState === "Resume" && (
        <Flashcard
          headings={headCards}
          trans={transCards}
          images={imagesCards}
          language={language}
          languageId={languageId}
          //descrp={["first"]}
          score={score}
          cardNo={langCount}
          count={parseInt(score) / (100 / 5) - 1}
        ></Flashcard>
      )}
    </div>
  );
}
export default Learning1;
