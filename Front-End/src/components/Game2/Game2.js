import React, { useState, useEffect } from "react";
import ContGame2 from "./ContGame2.js";
import "./Game2.css";
import { useSearchParams } from "react-router-dom";
import { getGameG2 } from "../Functions/APIFunctions.js";

function Game2() {
  const [searchparams] = useSearchParams();
  let score = useState(searchparams.get("score"));
  const language = searchparams.get("lang");
  const languageId = searchparams.get("languageId");
  const [transCards, setTransCards] = useState([]);
  const [imagesCards, setImagesCards] = useState([]);
  const [langCount, setLangCount] = useState(0);
  const trans = [];
  const images = [];

  const getGame = () => {
    getGameG2(
      languageId,
      setLangCount,
      langCount,
      trans,
      images,
      setTransCards,
      setImagesCards
    );
  };

  useEffect(() => {
    getGame();
  }, [langCount]);

  return (
    <div>
      <div className="color-div">
        <h1 className="head-h1">ACTIVITY II</h1>
        <ContGame2
          trans={transCards}
          images={imagesCards}
          language={language}
          languageId={languageId}
          score={parseInt(score)}
          cardNo={15}
          cardAll={langCount}
        />
      </div>
    </div>
  );
}

export default Game2;
