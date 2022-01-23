import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onDeleteCard(props.deleteCard);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      closePopupClickOverlay={props.closePopupClickOverlay}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    />
  );
}

export default DeleteCardPopup;
