import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Quiz.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { Card, Button } from "react-bootstrap";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const questions = [    {      question: "What is the English meaning of 'Arrivederci'?",      options: ["Hello", "Good bye", "Please", "Thank You"],
      answer: "Good bye",
    },
    {      
      question: "What is the English meaning of 'Ciao'?",      
      options: ["Hello", "Good bye", "Please", "Thank You"],
      answer: "Hello",
    },
    {      
      question: "What is the English meaning of 'Grazie'?",      
      options: ["Hello", "Good bye", "Please", "Thank You"],
      answer: "Thank You",
    },
    {      
      question: "What is the English meaning of 'Amore'?",      
      options: ["Hello", "Good bye", "Please", "Love"],
      answer: "Love",
    },
    {      
      question: "What is the English meaning of 'Felicità'?",      
      options: ["Hello", "Good bye", "Happiness", "Thank You"],
      answer: "Happiness",
    },
    {      
      question: "What is the English meaning of 'Gatto'?",      
      options: ["Cat", "Good bye", "Please", "Thank You"],
      answer: "Cat",
    },
    {      
      question: "What is the English meaning of 'Cane'?",      
      options: ["Hello", "Good bye", "Dog", "Thank You"],
      answer: "Dog",
    },
    {      
      question: "What is the English meaning of 'Sorridere'?",      
      options: ["Hello", "Smile", "Please", "Thank You"],
      answer: "Smile",
    },
    {      
      question: "What is the English meaning of 'Sì'?",      
      options: ["Hello", "Good bye", "Please", "Yes"],
      answer: "Yes",
    },
    {      
      question: "What is the English meaning of 'Italiano'?",      
      options: ["Hello", "Good bye", "Italian", "Thank You"],
      answer: "Italian",
    },
    
    
  ];

  const handleOptionClick = (selectedAnswer) => {
    if (!answered) {
      setAnswered(true);
      if (selectedAnswer === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        }
        setAnswered(false);
      }, 1000);
    }
  };

  const handleNextClick = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
    setAnswered(false);
  };

  const handlePreviousClick = () => {
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
    }
    setAnswered(false);
  };
  

  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  return (
    <div><h1 className="quiz-title">Activity 1</h1>
    <div className="quiz-container">
      
      <div className="quiz-body">
        <div className="quiz-progress">
          <ProgressBar
            now={progress}
            label={`${progress}%`}
            className="prg-bar"
          />
        </div>
        <Card className="quiz-question">
          <Card.Header>
            <h3 className="question-text">
              {questions[currentQuestion].question}
            </h3>
          </Card.Header>
          <Card.Body>
            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  className="option"
                  onClick={() => handleOptionClick(option)}
                  block
                  disabled={answered}
                >
                  {option}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>
        <div className="quiz-navigation">
          <div className="quiz-buttons">
            
          </div>
        </div>
      </div>
        <div className="quiz-score">
        {currentQuestion === questions.length && (
        <div>
          <h4>Quiz Completed</h4>
          <p>Your Score: {score}</p>
        </div>
        )}
        {currentQuestion !== questions.length && (
        <div>
          <h4>Score: {score}</h4>
        </div>
        )}
      </div>
    </div>
    </div>
);
}

export default Quiz;
