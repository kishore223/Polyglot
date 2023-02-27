import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Flashcard.css";
import Flashcard from "./Flashcard.js";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";

function Learning1() {
  const [searchparams] = useSearchParams();
  let score = searchparams.get("score");
  const language = searchparams.get("lang");
  const languageId = searchparams.get("languageId");
  const btnState = searchparams.get("btnState");
  const cookieslog = new Cookies();
  const email = cookieslog.get("user");
  let [cards, setCards] = useState();

  const getGame = () => {
    const game = {
      languageId,
      moduleId: 2,
    };
    fetch("http://localhost:8080/polyglot/getGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCards(responseJson);
      });
  };

  getGame();
  const headings = [];
  const trans = [];
  const images = [];

  for (var i = 0; i < Object.keys(cards["game_first"]).length; i++) {
    headings.push(cards["game_first"][i]["english_verb"]);
    trans.push(cards["game_first"][i]["italian_verb"]);
    images.push(cards["game_first"][i]["url_image"]);
  }

  if ((btnState === "Restart") | (btnState === "Start")) {
    score = 100 / Object.keys(cards["game_first"]).length;
    const updScores = {
      email,
      languageId: languageId,
      moduleId: 2,
      newScore: 100 / Object.keys(cards["game_first"]).length,
    };
    fetch("http://localhost:8080/polyglot/player/updateModuleScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updScores),
    });
  }
  return (
    <Flashcard
      headings={headings}
      trans={trans}
      images={images}
      language={language}
      languageId={languageId}
      //descrp={["first"]}
      cardNo={Object.keys(cards["game_first"]).length}
      score={score}
    ></Flashcard>
  );
}
export default Learning1;
