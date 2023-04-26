import React from "react";
import { Button } from "react-bootstrap";

function CardItem(props) {
  return (
    <div className="col-lg-3 col-md-12 col-sm-12">
      <li className="cards__item" onClick={(e) => props.onClick(e)}>
        <div className="cards__item__link">
          <figure className="cards__item__pic-wrap">
            <img className="cards__item__img" src={props.src} alt="" />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{props.text}</h5>
          </div>
          <Button className="btn-resume" onClick={""}>
            {props.btnText}
          </Button>
        </div>
      </li>
    </div>
  );
}

export default CardItem;
