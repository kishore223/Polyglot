import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { Lang, Dashcard } from "./Dashcard.js";
import Navbar from "../Navbar/NavBar.js";
import Nav from "react-bootstrap/Nav";
import BgLearning from "../Bg-Learning_1.svg";
import { useSearchParams } from "react-router-dom";
import { getLanguageDashboard, getScores } from "../Functions/APIFunctions.js";
import { email } from "../Functions/CommonScripts.js";

function Dashboard() {
  const [langDashCode, setLangDashCode] = useState([]);
  const [langCount, setLangCount] = useState(0);

  const [searchparams] = useSearchParams();
  const [lang, setLang] = useState(searchparams.get("lang"));
  const [languageId, setLanguageId] = useState(searchparams.get("languageId"));
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);
  const [score6, setScore6] = useState(0);
  const scores = { email, languageId };

  const myStyle = {
    backgroundImage: `url(${BgLearning})`,
    maxheight: "100vh",
    overflow: "auto",
  };

  const language = (e, langCode) => {
    e.preventDefault();
    if (langCode === 2001) {
      setLang("Italian");
      setLanguageId("2001");
    } else if (langCode === 2002) {
      setLang("French");
      setLanguageId("2002");
    } else if (langCode === 2003) {
      setLang("Spanish");
      setLanguageId("2003");
    } else if (langCode === 2004) {
      setLang("Swahili");
      setLanguageId("2004");
    }
    getScores(
      scores,
      setScore1,
      setScore2,
      setScore3,
      setScore4,
      setScore5,
      setScore6
    );
  };

  useEffect(() => {
    getLanguageDashboard(email, setLangCount, langCount, setLangDashCode);
    getScores(
      scores,
      setScore1,
      setScore2,
      setScore3,
      setScore4,
      setScore5,
      setScore6
    );
  }, [langCount]);

  return (
    <div>
      <div className="top-div"></div>
      <Navbar />
      <div className="row">
        <div className="col-lg-2 bg-color">
          <Nav className="flex-column nav-sty">
            {langDashCode.map((lan) => (
              <Lang
                key={lan[0].toUpperCase()}
                language={lan[0].toUpperCase()}
                onClick={(e) => language(e, lan[1])}
              />
            ))}
          </Nav>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <h1 className="card-head">{lang} Dashboard</h1>
          </div>
          <div className="row">
            <div className="col-lg-6 img-div" style={myStyle}>
              <h1 className="card-h1">LEARNING</h1>
              <Dashcard
                heading="Learning I"
                game="learn"
                lang={lang}
                languageId={languageId}
                level="learn1"
                score={score1}
                desc="Here will be the Description."
              />
              <Dashcard
                heading="Learning II"
                game="learn"
                lang={lang}
                languageId={languageId}
                level="learn2"
                score={score2}
                desc="Here will be the Description."
              />
              <Dashcard
                heading="Learning III"
                game="learn"
                lang={lang}
                languageId={languageId}
                level="learn3"
                score={score3}
                desc="Here will be the Description."
              />
            </div>
            <div className="col-lg-6 img-div" style={myStyle}>
              <h1 className="card-h1">ACTIVITIES</h1>
              <Dashcard
                heading="Activity I"
                game="game"
                lang={lang}
                languageId={languageId}
                level="game1"
                score={score4}
                desc="Here will be the Description."
              />
              <Dashcard
                heading="Activity II"
                game="game"
                lang={lang}
                languageId={languageId}
                level="game2"
                score={score5}
                desc="Here will be the Description."
              />
              <Dashcard
                heading="Activity III"
                game="game"
                lang={lang}
                languageId={languageId}
                level="game3"
                score={score6}
                desc="Here will be the Description."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
