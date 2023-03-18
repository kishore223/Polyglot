import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Learning1/Flashcard.css";
import ReactCardFlip from "react-card-flip";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BgLearning from "../Bg-Learning.svg";
import { email } from "../Functions/CommonScripts.js";
import { updateScore } from "../Functions/APIFunctions.js";

function FlashcardL2(props) {
  const [isFlipped, setFlip] = useState(true);
  const headings = props.headings;
  const trans = props.trans;
  const features = props.features;
  const conjugate = props.conjugate;
  const moduleId = props.moduleId;
  const images = props.images;
  const language = props.language;
  const languageId = props.languageId;
  const cardNo = props.cardNo;
  const score = props.score;
  const italian = props.italian;
  const navigate = useNavigate();
  const [cardCount, setCardCount] = useState(score);

  const initialCheck = (cardNo) => {
    if (score === "0") {
      setCardCount(parseInt(100 / (cardNo / 3)));
    }
  };

  useEffect(() => {
    initialCheck(cardNo);
  }, [cardNo]);

  const addCount = (e) => {
    setFlip(true);
    if (Math.ceil((cardCount / 100) * (cardNo / 3)) === cardNo / 3) {
      setCardCount(100);
      direct(e);
    } else {
      setCardCount(cardCount + 100 / (cardNo / 3));
    }
  };

  const removeCount = (e) => {
    setFlip(true);
    if (Math.ceil((cardCount / 100) * (cardNo / 3)) <= 1) {
      setCardCount(parseInt(100 / (cardNo / 3)));
    } else {
      setCardCount(cardCount - 100 / (cardNo / 3));
    }
  };

  const myStyle = {
    backgroundImage: `url(${BgLearning})`,
    height: "800px",
  };

  const direct = (e) => {
    updateScore(email, languageId, moduleId, cardCount, language, navigate);
  };

  return (
    <div className="padding-main">
      <div className="button-contianer">
        <BsXCircleFill
          className="btn-color"
          onClick={(e) => {
            direct(e);
          }}
        />
        <ProgressBar
          now={Math.ceil(cardCount)}
          label={`${Math.ceil(cardCount)}%`}
          className="prg-bar"
        />
      </div>
      <div style={myStyle}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <Card className="text-center card-width marg-top">
            <Card.Body>
              <h4 className="count">
                {Math.ceil((cardCount / 100) * (cardNo / 3))}/{cardNo / 3}
              </h4>
              <Card.Img
                variant="top"
                src={images[parseInt((cardCount / 100) * cardNo)]}
                className="img-card"
              />
              <p className="p-desc top-p">This is the English Verb</p>
              <Card.Title className="card-head">
                {headings[parseInt((cardCount / 100) * cardNo)]}
              </Card.Title>
              <Button
                variant="primary"
                onClick={(e) => setFlip(true)}
                className="flip-btn"
              >
                Flip the card to view the Tenses
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
                {Math.ceil((cardCount / 100) * (cardNo / 3))}/{cardNo / 3}
              </h4>
              <p className="p-desc top-p">This is the {language} Verb</p>
              <Card.Title className="card-head head-color">
                {italian[parseInt((cardCount / 100) * cardNo)]}
              </Card.Title>
              {/*<p className="p-desc">{descrp[count]}</p>*/}
              <div>
                <p className="p-desc top-p">Conjugate English Verb</p>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr class="table-info">
                        <th scope="col">No.</th>
                        <th scope="col">Conjugation</th>
                        <th scope="col">Italian Tense</th>
                        <th scope="col">English Tense</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="table-danger">
                        <th scope="row">1</th>
                        <td>
                          {features[parseInt((cardCount / 100) * cardNo) - 2]}
                        </td>
                        <td>
                          {trans[parseInt((cardCount / 100) * cardNo) - 2]}
                        </td>
                        <td>
                          {conjugate[parseInt((cardCount / 100) * cardNo) - 2]}
                        </td>
                      </tr>
                      <tr class="table-danger">
                        <th scope="row">2</th>
                        <td>
                          {features[parseInt((cardCount / 100) * cardNo) - 1]}
                        </td>
                        <td>
                          {trans[parseInt((cardCount / 100) * cardNo) - 1]}
                        </td>
                        <td>
                          {conjugate[parseInt((cardCount / 100) * cardNo) - 1]}
                        </td>
                      </tr>
                      <tr class="table-danger">
                        <th scope="row">3</th>
                        <td>
                          {features[parseInt((cardCount / 100) * cardNo)]}
                        </td>
                        <td>{trans[parseInt((cardCount / 100) * cardNo)]}</td>
                        <td>
                          {conjugate[parseInt((cardCount / 100) * cardNo)]}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <Button
                variant="primary"
                onClick={(e) => setFlip(false)}
                className="flip-btn flip-btn-color"
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
        </ReactCardFlip>
      </div>
    </div>
  );
}

export default FlashcardL2;
