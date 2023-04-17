import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Game3.css";
import { Button } from "react-bootstrap";

function GroupButton(props) {
  const handleOpt = (e, opt) => {
    e.preventDefault();
    switch (opt) {
      case "A":
        if (props.setQues === "1") {
          props.setTarget1("A");
          props.setColor1A[0]("green");
          props.setColor1B[0]("");
          props.setColor1C[0]("");
        } else if (props.setQues === "2") {
          props.setTarget2("A");
          props.setColor2A[0]("green");
          props.setColor2B[0]("");
          props.setColor2C[0]("");
        } else if (props.setQues === "3") {
          props.setTarget3("A");
          props.setColor3A[0]("green");
          props.setColor3B[0]("");
          props.setColor3C[0]("");
        }
        break;
      case "B":
        if (props.setQues === "1") {
          props.setTarget1("B");
          props.setColor1A[0]("");
          props.setColor1B[0]("green");
          props.setColor1C[0]("");
        } else if (props.setQues === "2") {
          props.setTarget2("B");
          props.setColor2A[0]("");
          props.setColor2B[0]("green");
          props.setColor2C[0]("");
        } else if (props.setQues === "3") {
          props.setTarget3("B");
          props.setColor3A[0]("");
          props.setColor3B[0]("green");
          props.setColor3C[0]("");
        }
        break;
      case "C":
        if (props.setQues === "1") {
          props.setTarget1("C");
          props.setColor1A[0]("");
          props.setColor1B[0]("");
          props.setColor1C[0]("green");
        } else if (props.setQues === "2") {
          props.setTarget2("C");
          props.setColor2A[0]("");
          props.setColor2B[0]("");
          props.setColor2C[0]("green");
        } else if (props.setQues === "3") {
          props.setTarget3("C");
          props.setColor3A[0]("");
          props.setColor3B[0]("");
          props.setColor3C[0]("green");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="quiz-option-row">
      {props.setQues === "1" && (
        <Button
          className="omr-btn"
          style={{ backgroundColor: props.setColor1A[1] }}
          option="A"
          onClick={(e) => handleOpt(e, "A")}
        >
          A
        </Button>
      )}
      {props.setQues === "2" && (
        <Button
          className="omr-btn"
          style={{ backgroundColor: props.setColor2A[1] }}
          option="A"
          onClick={(e) => handleOpt(e, "A")}
        >
          A
        </Button>
      )}
      {props.setQues === "3" && (
        <Button
          className="omr-btn"
          style={{ backgroundColor: props.setColor3A[1] }}
          option="A"
          onClick={(e) => handleOpt(e, "A")}
        >
          A
        </Button>
      )}
      {props.setQues === "1" && (
        <Button
          className="omr-btn"
          style={{ backgroundColor: props.setColor1B[1] }}
          option="B"
          onClick={(e) => handleOpt(e, "B")}
        >
          B
        </Button>
      )}
      {props.setQues === "2" && (
        <Button
          className="omr-btn"
          style={{ backgroundColor: props.setColor2B[1] }}
          option="B"
          onClick={(e) => handleOpt(e, "B")}
        >
          B
        </Button>
      )}
      {props.setQues === "3" && (
        <Button
          className="omr-btn"
          style={{ backgroundColor: props.setColor3B[1] }}
          option="B"
          onClick={(e) => handleOpt(e, "B")}
        >
          B
        </Button>
      )}
      {props.setQues === "1" && (
        <Button
          className="omr-btn"
          style={{ backgroundColor: props.setColor1C[1] }}
          option="C"
          onClick={(e) => handleOpt(e, "C")}
        >
          C
        </Button>
      )}
      {props.setQues === "2" && (
        <Button
          className="omr-btn"
          style={{ backgroundColor: props.setColor2C[1] }}
          option="C"
          onClick={(e) => handleOpt(e, "C")}
        >
          C
        </Button>
      )}
      {props.setQues === "3" && (
        <Button
          className="omr-btn"
          style={{ backgroundColor: props.setColor3C[1] }}
          option="C"
          onClick={(e) => handleOpt(e, "C")}
        >
          C
        </Button>
      )}
    </div>
  );
}

export default GroupButton;
