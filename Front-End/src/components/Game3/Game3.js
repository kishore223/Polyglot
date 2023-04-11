import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Game3.css";
import { Card, Button } from "react-bootstrap";

function OptionButton({ option, isDisabled, onSelect }) {
  return (
    <Button
      variant="outline-primary"
      disabled={isDisabled}
      onClick={() => onSelect(option)}
    >
      {option}
    </Button>
  );
}

function Game3() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (option) => {
    setSelectedOptions({ ...selectedOptions, [currentQuestion]: option });
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div>
      <h1 className="quiz-title">Activity 3</h1>
      <div className="quiz-container">
        <div className="quiz-body">
          <div className="quiz">
            <Card className="quiz-questions">
              <Card.Body>
                <Card.Title className="quiz-head" >
                  Questions
                </Card.Title>
                <Card.Text className="question-text">
                  <div>Love</div>
                  <div>Hate</div>
                  <div>Sing</div>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="quiz-answers">
              <Card.Body>
                <Card.Title className="quiz-head">
                  Answers
                </Card.Title>
                <Card.Text className="question-text">
                  <div>A. Cantare</div>
                  <div>B. Amore</div>
                  <div>C. Odio</div>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="quiz-option">
              <Card.Body>
                <Card.Title className="quiz-head" >
                  Options
                </Card.Title>
                <div className="quiz-option-row">
                  <OptionButton
                    option="A"
                    isDisabled={selectedOptions[currentQuestion]}
                    onSelect={handleOptionSelect}
                  />
                  <OptionButton
                    option="B"
                    isDisabled={selectedOptions[currentQuestion]}
                    onSelect={handleOptionSelect}
                  />
                  <OptionButton
                    option="C"
                    isDisabled={selectedOptions[currentQuestion]}
                    onSelect={handleOptionSelect}
                  />
                </div>
                <div className="quiz-option-row">
                  <OptionButton
                    option="A"
                    isDisabled={selectedOptions[currentQuestion]}
                    onSelect={handleOptionSelect}
                  />
                  <OptionButton
                    option="B"
                    isDisabled={selectedOptions[currentQuestion]}
                    onSelect={handleOptionSelect}
                  />
                  <OptionButton
                    option="C"
                    isDisabled={selectedOptions[currentQuestion]}
                    onSelect={handleOptionSelect}
                  />
                </div>
                <div className="quiz-option-row">
                  <OptionButton
                    option="A"
                    isDisabled={selectedOptions[currentQuestion]}
                    onSelect={handleOptionSelect}
                  />
                  <OptionButton
                    option="B"
                    isDisabled={selectedOptions[currentQuestion]}
                    onSelect={handleOptionSelect}
                  />
                  <OptionButton
                    option="C"
                    isDisabled={selectedOptions[currentQuestion]}
                    onSelect={handleOptionSelect}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="submit-button">
              <Button >Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game3;
