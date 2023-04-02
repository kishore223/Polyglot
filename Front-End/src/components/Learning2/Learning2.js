import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Learning1/Flashcard.css";
import FlashcardL2 from "./FlashcardL2.js";
import { useSearchParams } from "react-router-dom";
import { getGameL2 } from "../Functions/APIFunctions.js";

function Learning2() {
  const [searchparams] = useSearchParams();
  let score = useState(searchparams.get("score"));
  const language = searchparams.get("lang");
  const languageId = searchparams.get("languageId");
  const btnState = searchparams.get("btnState");
  const [headCards, setHeadCards] = useState([]);
  const [transCards, setTransCards] = useState([]);
  const [imagesCards, setImagesCards] = useState([]);
  const [featuresCards, setFeaturesCards] = useState([]);
  const [conjugateCards, setConjugateCards] = useState([]);
  const [italianCards, setItalianCards] = useState([]);
  const [langCount, setLangCount] = useState(0);
  const headings = [];
  const trans = [];
  const images = [];
  const features = [];
  const conjugate = [];
  const italian = [];

  const getGame = () => {
    getGameL2(
      languageId,
      setLangCount,
      headings,
      trans,
      images,
      features,
      conjugate,
      italian,
      setHeadCards,
      setTransCards,
      setImagesCards,
      setFeaturesCards,
      setConjugateCards,
      setItalianCards
    );
  };

  useEffect(() => {
    getGame();
  }, [langCount]);

  return (
    <div>
      <div className="color-div">
        <h1 className="head-h1">LEARNING II</h1>
        {btnState === "Restart" && (
          <FlashcardL2
            headings={headCards}
            trans={transCards}
            images={imagesCards}
            italian={italianCards}
            language={language}
            languageId={languageId}
            features={featuresCards}
            conjugate={conjugateCards}
            moduleId="4"
            score={"0"}
            cardNo={langCount}
          ></FlashcardL2>
        )}
        {btnState === "Start" && (
          <FlashcardL2
            headings={headCards}
            trans={transCards}
            images={imagesCards}
            italian={italianCards}
            language={language}
            languageId={languageId}
            features={featuresCards}
            conjugate={conjugateCards}
            moduleId="4"
            score={"0"}
            cardNo={langCount}
          ></FlashcardL2>
        )}
        {btnState === "Resume" && (
          <FlashcardL2
            headings={headCards}
            trans={transCards}
            images={imagesCards}
            italian={italianCards}
            language={language}
            languageId={languageId}
            features={featuresCards}
            conjugate={conjugateCards}
            moduleId="4"
            score={parseFloat(score)}
            cardNo={langCount}
          ></FlashcardL2>
        )}
      </div>
    </div>
  );
}
export default Learning2;
