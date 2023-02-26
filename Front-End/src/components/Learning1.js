import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Flashcard.css";
import Flashcard from "./Flashcard.js";
import { useSearchParams } from "react-router-dom";

function Learning1() {
  const [searchparams] = useSearchParams();
  const score = searchparams.get("score");
  const cards = {
    game_first: [
      {
        index: 1,
        english_verb: "jump",
        italian_verb: "saltare",
        url_image:
          "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcT72MG4ALk3Ahbqe6KLFDhqgKwL5uJkci2qR5YbbDUbDyiP1Lq4djHBTTtv2f27mRxUeFmV_F7dmdrHiY1bGhw",
      },
      {
        index: 2,
        english_verb: "read",
        italian_verb: "leggere",
        url_image:
          "https://cs.ilgiardinodeilibri.it/data/spec/big/leggere-fa-bene-speciale.jpg?_=1647342546",
      },
      {
        index: 3,
        english_verb: "write",
        italian_verb: "scrivere",
        url_image:
          "https://laricerca.loescher.it/images/stories/istruzione/WRW/mano.jpg",
      },
      {
        index: 4,
        english_verb: "jump",
        italian_verb: "saltare",
        url_image:
          "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcT72MG4ALk3Ahbqe6KLFDhqgKwL5uJkci2qR5YbbDUbDyiP1Lq4djHBTTtv2f27mRxUeFmV_F7dmdrHiY1bGhw",
      },
      {
        index: 5,
        english_verb: "read",
        italian_verb: "leggere",
        url_image:
          "https://cs.ilgiardinodeilibri.it/data/spec/big/leggere-fa-bene-speciale.jpg?_=1647342546",
      },
    ],
  };
  const headings = [];
  const trans = [];
  const images = [];
  for (var i = 0; i < Object.keys(cards["game_first"]).length; i++) {
    headings.push(cards["game_first"][i]["english_verb"]);
    trans.push(cards["game_first"][i]["italian_verb"]);
    images.push(cards["game_first"][i]["url_image"]);
  }
  return (
    <Flashcard
      headings={headings}
      trans={trans}
      images={images}
      //descrp={["first"]}
      cardNo={Object.keys(cards["game_first"]).length}
      score={score}
    ></Flashcard>
  );
}
export default Learning1;
