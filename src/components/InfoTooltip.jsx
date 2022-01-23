import React from "react";

function InfoTooltip({ isOpen, onClose, message }) {
  return (
    <div className={`popup ${isOpen ? "popup_visible" : ""}`}>
      <div className="popup__content popup__info">
        <button
          type="button"
          className="popup__close-button popup__info_close"
          onClick={onClose}
        ></button>
        <img src={message.image} alt={message.text} className="popup__info_image" />
        <p className="popup__info_text"> {message.text} </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
