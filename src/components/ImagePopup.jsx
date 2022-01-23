function ImagePopup({ item, onClose }) {
  return (
    <div className={`popup popup_image ${item ? `popup_visible` : ""}`}>
      
      <div className="popup__image-content">
      <button
        type="button"
        className="popup__image-content popup__close-button popup__image-close"
        onClick={onClose}
      ></button>
        <img
          src={item ? item.link : ""}
          alt={item ? item.name : ""}
          className="popup__image-content popup__image-pic"
        />
        <h3 className="popup__image-content popup__image-text">
          {item ? item.name : ""}
        </h3>
      </div>
    </div>
  );
}

export default ImagePopup;
