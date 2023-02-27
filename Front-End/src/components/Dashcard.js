import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import Card from "react-bootstrap/Card";
import { BsCardHeading } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { FaLanguage } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import { BsCheckCircleFill } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";
import {
  MdIncompleteCircle,
  MdLocalActivity,
  MdNotStarted,
} from "react-icons/md";

function Lang(props) {
  return (
    <Button className="btn-sty" onClick={props.onClick}>
      <Nav.Link eventKey={props.language} className="nav-link-sty ">
        <FaLanguage className="icon-sty" />
        <p className="span-sty">{props.language}</p>
      </Nav.Link>
    </Button>
  );
}

function Dashcard(props) {
  const navigate = useNavigate();

  const learn_game = (e, btnState) => {
    if (props.level === "learn1") {
      navigate({
        pathname: "/Learning1",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    } else if (props.level === "learn2") {
      navigate({
        pathname: "/Learning2",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    } else if (props.level === "learn3") {
      navigate({
        pathname: "/Learning3",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    } else if (props.level === "game1") {
      navigate({
        pathname: "/Activity1",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    } else if (props.level === "game2") {
      navigate({
        pathname: "/Activity2",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    } else if (props.level === "game3") {
      navigate({
        pathname: "/Activity3",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    }
  };
  return (
    <Card className="card-main">
      <Card.Body>
        <div className="row">
          <div className="col-sm-0.5 sta-div"></div>
          <div className="col-sm-1 icon-div-two">
            {props.game === "learn" && <BsCardHeading className="icon-card" />}
            {props.game === "game" && <MdLocalActivity className="icon-card" />}
          </div>
          <div className="col-sm-10">
            <Card.Title>
              <div className="card-title-main">
                {props.heading}{" "}
                {props.score <= 100 && props.score >= 0 && (
                  <Badge className="badge-card-begin">Beginner</Badge>
                )}
                {props.score <= 100 && props.score >= 34 && (
                  <Badge className="badge-card-inter">Intermediate</Badge>
                )}
                {props.score <= 100 && props.score >= 67 && (
                  <Badge className="badge-card-adv">Advanced</Badge>
                )}
              </div>
              <p className="p-desc">{props.desc}</p>
              {props.score === "100" && (
                <span className="span-acc span-pass">
                  <BsCheckCircleFill className="icon-acc" /> Completed
                </span>
              )}
              {props.score < 100 && props.score > 0 && (
                <span className="span-acc span-fail">
                  <MdIncompleteCircle className="icon-acc" /> In Progress
                </span>
              )}
              {props.score === "0" && (
                <span className="span-acc span-sta">
                  <MdNotStarted className="icon-acc" /> Not Started
                </span>
              )}
              {props.score === "0" && (
                <Button
                  className="btn-resume"
                  onClick={(e) => learn_game(e, "Start")}
                >
                  START
                </Button>
              )}
              {props.score < 100 && props.score > 0 && (
                <Button
                  className="btn-resume"
                  onClick={(e) => learn_game(e, "Resume")}
                >
                  RESUME
                </Button>
              )}
              {props.score === "100" && (
                <Button
                  className="btn-resume"
                  onClick={(e) => learn_game(e, "Restart")}
                >
                  RESTART
                </Button>
              )}
            </Card.Title>
            <Card.Text className="txt-card">
              <ProgressBar
                now={props.score}
                label={`${props.score}%`}
                className="prog-card"
              />
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export { Dashcard, Lang };
