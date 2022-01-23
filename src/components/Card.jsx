import React from "react";
import trashCan from "../images/delete.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ item, onCardClick, onCardLike, onClickDeleteCard }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = item.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "element__delete_active" : "element__delete"
  }`;

  const isLiked = item.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeCard = () => {
    onCardLike(item);
  };

  const handleDeleteCard = () => {
    onClickDeleteCard(item);
  };

  return (
    <article className="element">
      <div className="element__picture">
        <img
          src={item.link}
          alt={item.name}
          className="element__image"
          onClick={handleCardClick}
        />
        <button
          type="reset"
          className={cardDeleteButtonClassName}
          style={{ backgroundImage: `url(${trashCan})` }}
          onClick={handleDeleteCard}
        ></button>
      </div>

      <div className="element__text-container">
        <h3 className="element__name">{item.name}</h3>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeCard}
          ></button>
          <p className="element__like-amount">{item.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
