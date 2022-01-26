import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, closePopupClickOverlay }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      closePopupClickOverlay={closePopupClickOverlay}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default DeleteCardPopup;
