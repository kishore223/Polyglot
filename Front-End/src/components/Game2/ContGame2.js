import React, { useState, useEffect } from "react";
import { Container, Row, Card, Badge, ProgressBar } from "react-bootstrap";
import "./Game2.css";
import { BsXCircleFill } from "react-icons/bs";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { CardGame2, ContainerGame2 } from "./CardGame2.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { email } from "../Functions/CommonScripts.js";
import BgLearning from "../Bg-Learning.svg";
import { updateScore } from "../Functions/APIFunctions.js";
import { genRand, shuffleArray } from "../Functions/CommonScripts";

function ContGame2(props) {
  const [searchparams] = useSearchParams();
  const language = searchparams.get("lang");
  const languageId = searchparams.get("languageId");
  const navigate = useNavigate();
  const trans = props.trans;
  const cardNo = props.cardNo;
  const cardAll = props.cardAll;
  const images = props.images;
  const [count, setCount] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  let [score, setScore] = useState(0);
  const numbers = [0, 1, 2];
  let nums_set = new Set();
  let [nums, setNums] = useState([]);

  const initialCheck = (nums_set) => {
    if (score === 0) {
      setNums(genRand(nums_set));
    }
  };

  useEffect(() => {
    initialCheck(nums_set);
  }, [cardAll]);

  const [shuffledCards, setShuffledCards] = useState(shuffleArray(numbers));
  const [dragCard, setDragCard] = useState(null);
  const [dragCardTarget1, setDragCardTarget1] = useState(null);
  const [dragCardTarget2, setDragCardTarget2] = useState(null);
  const [dragCardTarget3, setDragCardTarget3] = useState(null);
  const [target1Dropped, setTarget1Dropped] = useState(false);
  const [target2Dropped, setTarget2Dropped] = useState(false);
  const [target3Dropped, setTarget3Dropped] = useState(false);

  const handleDragStart = (e, card) => {
    setDragCard(card);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, target) => {
    e.preventDefault();

    switch (target) {
      case "target1":
        setTarget1Dropped(true);
        setDragCardTarget1(dragCard);
        break;
      case "target2":
        setTarget2Dropped(true);
        setDragCardTarget2(dragCard);
        break;
      case "target3":
        setTarget3Dropped(true);
        setDragCardTarget3(dragCard);
        break;
      default:
        break;
    }
  };

  const addCount = (e) => {
    check(e);
    e.preventDefault();
    if (count === cardNo - 1) {
      direct(e);
    } else {
      setCount(count + 1);
      setCardCount(cardCount + 3);
    }
    setShuffledCards(shuffleArray(numbers));
  };

  const check = (e) => {
    if (
      dragCardTarget1 === trans[cardCount + nums[count]] &&
      dragCardTarget2 === trans[cardCount + nums[count] + 2] &&
      dragCardTarget3 === trans[cardCount + nums[count] + 1]
    ) {
      setScore(score + 100 / cardNo);
      if (count + 1 === cardNo) {
        score = score + 100 / cardNo;
      }
    }
    reset();
  };

  const reset = () => {
    setDragCard(null);
    setDragCardTarget1(null);
    setDragCardTarget2(null);
    setDragCardTarget3(null);
    setTarget1Dropped(false);
    setTarget2Dropped(false);
    setTarget3Dropped(false);
  };

  const myStyle = {
    backgroundImage: `url(${BgLearning})`,
    height: "800px",
  };

  const direct = (e) => {
    updateScore(email, languageId, "3", score, language, navigate);
  };

  return (
    <div>
      <div className="padding-main">
        <div className="button-contianer">
          <BsXCircleFill
            className="btn-color"
            onClick={(e) => {
              check(e);
              direct(e);
            }}
          />
          <ProgressBar
            now={parseInt(((count + 1) * 100) / cardNo)}
            label={`${parseInt(((count + 1) * 100) / cardNo)}%`}
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
            <p className="p-main-game2 top-p">
              ... Drag the verbs to the correct tenses ...
            </p>
            <Container className="mt-3">
              <Row>
                <CardGame2
                  cardNo={trans[shuffledCards[0] + cardCount + nums[count]]}
                  cardTitle={trans[shuffledCards[0] + cardCount + nums[count]]}
                  onDragStart={(e) =>
                    handleDragStart(
                      e,
                      trans[shuffledCards[0] + cardCount + nums[count]]
                    )
                  }
                  cardText="Drag this Verb."
                />
                <CardGame2
                  cardNo={trans[shuffledCards[1] + cardCount + nums[count]]}
                  cardTitle={trans[shuffledCards[1] + cardCount + nums[count]]}
                  onDragStart={(e) =>
                    handleDragStart(
                      e,
                      trans[shuffledCards[1] + cardCount + nums[count]]
                    )
                  }
                  cardText="Drag this Verb."
                />
                <CardGame2
                  cardNo={trans[shuffledCards[2] + cardCount + nums[count]]}
                  cardTitle={trans[shuffledCards[2] + cardCount + nums[count]]}
                  onDragStart={(e) =>
                    handleDragStart(
                      e,
                      trans[shuffledCards[2] + cardCount + nums[count]]
                    )
                  }
                  cardText="Drag this Verb."
                />
              </Row>
              <Row className="mt-3 padding-top">
                <ContainerGame2
                  targetTextBefore="Drop the verb here."
                  targetTextAfter={dragCardTarget1}
                  targetDropped={target1Dropped}
                  targetNo="target1"
                  targetTitle="PRESENT TENSE"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "target1")}
                  images={images[count]}
                />
                <ContainerGame2
                  targetTextBefore="Drop the verb here."
                  targetTextAfter={dragCardTarget2}
                  targetDropped={target2Dropped}
                  targetNo="target2"
                  targetTitle="PAST TENSE"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "target2")}
                  images={images[count]}
                />
                <ContainerGame2
                  targetTextBefore="Drop the verb here."
                  targetTextAfter={dragCardTarget3}
                  targetDropped={target3Dropped}
                  targetNo="target3"
                  targetTitle="FUTURE TENSE"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "target3")}
                  images={images[count]}
                />
              </Row>
            </Container>
            <div className="button-contianer">
              <FaChevronCircleLeft className="btn-left no-left-btn" />
              <FaChevronCircleRight
                className="btn-right"
                onClick={(e) => {
                  addCount(e);
                }}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ContGame2;
