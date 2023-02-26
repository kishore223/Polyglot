import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Flashcard.css";
import ReactCardFlip from "react-card-flip";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BgLearning from "./Bg-Learning.svg";

function Flashcard(props) {
  const [isFlipped, setFlip] = useState(false);
  const headings = props.headings;
  const trans = props.trans;
  //const descrp = props.descrp;
  const score = props.score;
  const images = props.images;
  const cardNo = props.cardNo;
  const [count, setCount] = useState(score / cardNo - 1);
  const navigate = useNavigate();

  const addCount = (e) => {
    e.preventDefault();
    setFlip(false);
    if (count === cardNo - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  const removeCount = (e) => {
    e.preventDefault();
    setFlip(false);
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };

  const myStyle = {
    backgroundImage: `url(${BgLearning})`,
    height: "800px",
  };

  const direct = () => {
    navigate("/Home");
  };

  return (
    <div className="color-div">
      <h1 className="head-h1">LEARNING I</h1>
      <div className="padding-main">
        <div className="button-contianer">
          <BsXCircleFill className="btn-color" onClick={direct} />
          <ProgressBar
            now={(count + 1) * (100 / cardNo)}
            label={`${(count + 1) * (100 / cardNo)}%`}
            className="prg-bar"
          />
        </div>
        <div style={myStyle}>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card className="text-center card-width marg-top">
              <Card.Body>
                <h4 className="count">
                  {count + 1}/{cardNo}
                </h4>
                <Card.Img
                  variant="top"
                  src={images[count]}
                  className="img-card"
                />
                <p className="p-desc top-p">This is the Italian Word</p>
                <Card.Title className="card-head">{trans[count]}</Card.Title>
                <Button
                  variant="primary"
                  onClick={(e) => setFlip(true)}
                  className="flip-btn"
                >
                  Flip the card for English Word
                </Button>
                <div class="button-contianer">
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
                  {count + 1}/{cardNo}
                </h4>
                <p className="p-desc top-p">This is the English Word</p>
                <Card.Title className="card-head card-head-color">
                  {headings[count]}
                </Card.Title>
                {/*<p className="p-desc">{descrp[count]}</p>*/}
                <Button
                  variant="primary"
                  onClick={(e) => setFlip(false)}
                  className="flip-btn flip-btn-color"
                >
                  Flip the card for Italian Word
                </Button>
                <div class="button-contianer">
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
    </div>
  );
}

export default Flashcard;
