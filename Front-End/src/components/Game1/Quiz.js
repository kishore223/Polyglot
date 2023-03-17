import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Quiz.css";
import { Card, Button, Row, Col, ProgressBar, Badge } from "react-bootstrap";
import BgLearning from "../Bg-Learning.svg";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { email } from "../Functions/CommonScripts.js";
import { updateScore } from "../Functions/APIFunctions.js";

function Quiz(props) {
  let [score, setScore] = useState(0);
  const [searchparams] = useSearchParams();
  const language = searchparams.get("lang");
  const languageId = searchparams.get("languageId");
  const navigate = useNavigate();
  const images = props.images;
  const cardNo = props.cardNo;
  const questions = props.questions;
  const optionA = props.optionA;
  const optionB = props.optionB;
  const optionC = props.optionC;
  const optionD = props.optionD;
  const answers = props.answers;
  const [count, setCount] = useState(0);

  const checkAnswer = (e, selectedAnswer) => {
    e.preventDefault();
    if (selectedAnswer === answers[count]) {
      setScore(score + 100 / cardNo);
      if (count + 1 === cardNo) {
        score = score + 100 / cardNo;
      }
    }
    if (count + 1 === cardNo) {
      direct(e);
    }
    setCount(count + 1);
  };

  const myStyle = {
    backgroundImage: `url(${BgLearning})`,
    height: "800px",
  };

  const direct = (e) => {
    updateScore(email, languageId, "1", score, language, navigate);
  };

  return (
    <div>
      <div className="padding-main">
        <div className="button-contianer">
          <BsXCircleFill
            className="btn-color"
            onClick={(e) => {
              direct(e);
            }}
          />
          <ProgressBar
            now={Math.ceil((count + 1) * (100 / cardNo))}
            label={`${Math.ceil((count + 1) * (100 / cardNo))}%`}
            className="prg-bar"
          />
        </div>
      </div>
      <div style={myStyle}>
        <Card className="text-center card-width card-width-game2">
          <Card.Body>
            <div>
              <h4 className="count">
                <center>
                  {count + 1}/{cardNo}
                </center>
                <Badge className="h4-score">Score {Math.ceil(score)}</Badge>
              </h4>
            </div>
            <div className="quiz-options">
              <p className="p-main-game2 top-p">{questions[count]}</p>
              <Card.Img
                variant="top"
                src={images[count]}
                className="img-card img-game1"
              />
              <Row>
                <Col className="col-game1">
                  <Button
                    key={1}
                    className="btn-game1"
                    onClick={(e) => checkAnswer(e, "A")}
                    block
                  >
                    {optionA[count]}
                  </Button>
                </Col>
                <Col className="col-game1">
                  <Button
                    key={2}
                    className="btn-game1 btn-game1-blue "
                    onClick={(e) => checkAnswer(e, "B")}
                    block
                  >
                    {optionB[count]}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="col-game1">
                  <Button
                    key={3}
                    className="btn-game1 btn-game1-blue "
                    onClick={(e) => checkAnswer(e, "C")}
                    block
                  >
                    {optionC[count]}
                  </Button>
                </Col>
                <Col className="col-game1">
                  <Button
                    key={4}
                    className="btn-game1"
                    onClick={(e) => checkAnswer(e, "D")}
                    block
                  >
                    {optionD[count]}
                  </Button>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Quiz;
