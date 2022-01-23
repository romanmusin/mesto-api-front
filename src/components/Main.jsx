import React from "react";
import pen from "../images/pen.svg";
import plus from "../images/plus-button.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div onClick={props.onEditAvatar} className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="аватар"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__button-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              onClick={props.onEditProfile}
              className="profile__edit-button"
            >
              <img src={pen} alt="измеить" />
            </button>
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__plus"
        >
          <img src={plus} alt="Добавить" className="profile__plus-img" />
        </button>
      </section>

      <section className="elements">
        {props.cards.map((item) => {
          return (
            <Card
              key={item._id}
              item={item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onClickDeleteCard={props.onClickDeleteCard}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
