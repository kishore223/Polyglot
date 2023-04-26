import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Flashcard.css";
import ReactCardFlip from "react-card-flip";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BgLearning from "../Bg-Learning.svg";
import { email } from "../Functions/CommonScripts.js";
import { updateScore } from "../Functions/APIFunctions.js";

function FlashcardL1(props) {
  const [isFlipped, setFlip] = useState(false);
  const headings = props.headings;
  const trans = props.trans;
  const moduleId = props.moduleId;
  const images = props.images;
  const language = props.language;
  const languageId = props.languageId;
  const cardNo = props.cardNo;
  let score = props.score;
  const navigate = useNavigate();
  const [cardCount, setCardCount] = useState(score);

  const initialCheck = (cardNo) => {
    if (score === "0") {
      setCardCount(parseInt(100 / cardNo));
    }
  };

  const addCount = (e) => {
    setFlip(false);
    if (Math.ceil((cardCount / 100) * cardNo) === cardNo) {
      direct(e);
    } else {
      setCardCount(cardCount + 100 / cardNo);
      score = false;
    }
  };

  const removeCount = (e) => {
    setFlip(false);
    if (Math.ceil((cardCount / 100) * cardNo) <= 1) {
      setCardCount(parseInt(100 / cardNo));
    } else {
      setCardCount(cardCount - 100 / cardNo);
    }
  };

  const myStyle = {
    backgroundImage: `url(${BgLearning})`,
    height: "800px",
  };

  const direct = (e) => {
    updateScore(email, languageId, moduleId, cardCount, language, navigate);
  };

  useEffect(() => {
    initialCheck(cardNo);
  }, [cardNo]);

  return (
    <div className="padding-main">
      <div className="row">
        <div className="col-1">
          <BsXCircleFill
            className="btn-color"
            onClick={(e) => {
              direct(e);
            }}
          />
        </div>
        <div className="col-11">
          <ProgressBar
            now={Math.ceil(cardCount)}
            label={`${Math.ceil(cardCount)}%`}
            className="prg-bar"
          />{" "}
        </div>
      </div>
      <div style={myStyle} className="card-learn1">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <Card className="text-center card-width marg-top">
            <Card.Body>
              <h4 className="count">
                {Math.ceil((cardCount / 100) * cardNo)}/{cardNo}
              </h4>
              <Card.Img
                variant="top"
                src={images[parseInt((cardCount / 100) * cardNo)]}
                className="img-card"
              />
              <p className="p-desc top-p">This is the {language} Verb</p>
              <Card.Title className="card-head">
                {trans[parseInt((cardCount / 100) * cardNo)]}
              </Card.Title>
              <Button
                variant="primary"
                onClick={(e) => setFlip(true)}
                className="flip-btn"
              >
                Flip the card for English Word
              </Button>
              <div className="button-contianer">
                <FaChevronCircleLeft
                  className="btn-left"
                  onClick={(e) => removeCount(e)}
                />
                <FaChevronCircleRight
                  className="btn-right"
                  onClick={(e) => addCount(e)}
                />
              </div>
            </Card.Body>
          </Card>
          <Card className="text-center card-width marg-top card-width-color">
            <Card.Body>
              <h4 className="count">
                {Math.ceil((cardCount / 100) * cardNo)}/{cardNo}
              </h4>
              <p className="p-desc top-p">This is the English Verb</p>
              <Card.Title className={"card-head card-head-color"}>
                {headings[parseInt((cardCount / 100) * cardNo)]}
              </Card.Title>
              <Button
                variant="primary"
                onClick={(e) => setFlip(false)}
                className="flip-btn flip-btn-color"
              >
                Flip the card for Italian Word
              </Button>
              <div className="button-contianer">
                <FaChevronCircleLeft
                  className="btn-left"
                  onClick={(e) => removeCount(e)}
                />
                <FaChevronCircleRight
                  className="btn-right"
                  onClick={(e) => addCount(e)}
                />
              </div>
            </Card.Body>
          </Card>
        </ReactCardFlip>
      </div>
    </div>
  );
}

export default FlashcardL1;
