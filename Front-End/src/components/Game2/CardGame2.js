import React from "react";
import { Col, Card } from "react-bootstrap";
import "./Game2.css";

export function CardGame2(props) {
  const cardNo = props.cardNo;
  const onDragStart = props.onDragStart;
  const cardTitle = props.cardTitle;
  const cardText = props.cardText;
  return (
    <Col>
      <Card
        id={cardNo}
        draggable
        onDragStart={onDragStart}
        className="card-width-game2"
      >
        <Card.Header className="game2-card-header">
          <p className="p-desc top-p p-desc-game2">{cardText}</p>
        </Card.Header>
        <Card.Body>
          <Card.Title className="card-head card-head-color card-head-game2">
            {cardTitle}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

export function ContainerGame2(props) {
  const targetNo = props.targetNo;
  const targetDropped = props.targetDropped;
  const onDragOver = props.onDragOver;
  const onDrop = props.onDrop;
  const targetTitle = props.targetTitle;
  const targetTextBefore = props.targetTextBefore;
  const targetTextAfter = props.targetTextAfter;
  const images = props.images;
  return (
    <Col>
      <Card
        id={targetNo}
        style={
          targetDropped
            ? {
                backgroundImage: `url(${images})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }
            : {}
        }
        className={targetDropped ? "bg-color-card-header" : "bg-color-cont"}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Card.Header className="game2-card-header-red">
          <p className="p-desc top-p p-cont-game2">{targetTitle}</p>
        </Card.Header>
        <Card.Body className="cent-just">
          {targetDropped ? (
            <Card.Text className="card-head card-head-color card-head-game2 card-head-game2-color">
              {targetTextAfter}
            </Card.Text>
          ) : (
            <Card.Text className="p-text-bef-game2">
              {targetTextBefore}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
      <div className="marg-top-card"></div>
    </Col>
  );
}
