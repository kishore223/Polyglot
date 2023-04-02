import React from "react";

function CardItem(props) {
  return (
    <li className="cards__item" onClick={(e) => props.onClick(e)}>
      <div className="cards__item__link">
        <figure className="cards__item__pic-wrap">
          <img className="cards__item__img" src={props.src} alt="" />
        </figure>
        <div className="cards__item__info">
          <h5 className="cards__item__text">{props.text}</h5>
        </div>
      </div>
    </li>
  );
}

export default CardItem;
