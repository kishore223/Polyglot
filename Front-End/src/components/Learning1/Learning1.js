import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Flashcard.css";
import FlashcardL1 from "./FlashcardL1.js";
import { useSearchParams } from "react-router-dom";
import { getGameL1 } from "../Functions/APIFunctions.js";

function Learning1() {
  const [searchparams] = useSearchParams();
  let score = useState(searchparams.get("score"));
  const language = searchparams.get("lang");
  const languageId = searchparams.get("languageId");
  const btnState = searchparams.get("btnState");
  const [headCards, setHeadCards] = useState([]);
  const [transCards, setTransCards] = useState([]);
  const [imagesCards, setImagesCards] = useState([]);
  const [langCount, setLangCount] = useState(0);
  const headings = [];
  const trans = [];
  const images = [];

  const getGame = () => {
    getGameL1(
      languageId,
      setLangCount,
      headings,
      trans,
      images,
      setHeadCards,
      setTransCards,
      setImagesCards
    );
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <div>
      <div className="color-div">
        <h1 className="head-h1">LEARNING I</h1>
        {btnState === "Restart" && (
          <FlashcardL1
            headings={headCards}
            trans={transCards}
            images={imagesCards}
            language={language}
            languageId={languageId}
            moduleId="2"
            score={"0"}
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
            moduleId="2"
            score={"0"}
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
            moduleId="2"
            score={parseFloat(score)}
            cardNo={langCount}
          ></FlashcardL1>
        )}
      </div>
    </div>
  );
}
export default Learning1;
