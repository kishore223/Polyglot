import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Quiz.css";
import Quiz from "./Quiz.js";
import { useSearchParams } from "react-router-dom";
import { getGameG1 } from "../Functions/APIFunctions.js";

function Game1() {
  const [searchparams] = useSearchParams();
  const languageId = searchparams.get("languageId");
  const btnState = searchparams.get("btnState");
  const [questions, setQuestions] = useState([]);
  const [optionA, setOptionA] = useState([]);
  const [optionB, setOptionB] = useState([]);
  const [optionC, setOptionC] = useState([]);
  const [optionD, setOptionD] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [images, setImages] = useState([]);
  const ques = [];
  const ans = [];
  const optA = [];
  const optB = [];
  const optC = [];
  const optD = [];
  const image = [];
  const [langCount, setLangCount] = useState(0);

  const getGame = () => {
    getGameG1(
      languageId,
      setLangCount,
      ques,
      optA,
      optB,
      optC,
      optD,
      ans,
      image,
      setQuestions,
      setOptionA,
      setOptionB,
      setOptionC,
      setOptionD,
      setAnswers,
      setImages
    );
  };

  useEffect(() => {
    getGame();
  }, [langCount]);

  return (
    <div>
      <div className="color-div">
        <h1 className="head-h1">ACTIVITY I</h1>
        {btnState && (
          <Quiz
            questions={questions}
            images={images}
            answers={answers}
            optionA={optionA}
            cardNo={langCount}
            optionB={optionB}
            optionC={optionC}
            optionD={optionD}
          />
        )}
      </div>
    </div>
  );
}

export default Game1;
