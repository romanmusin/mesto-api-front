import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const userAvatar = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: userAvatar.current.value,
    });
    userAvatar.current.value = "";
  }

  return (
    <PopupWithForm //Попап редактирования аватара
      name="edit-avatar_form"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        ref={userAvatar}
        type="url"
        id="avatar-link"
        className="popup__input popup__input_type_link"
        minLength="2"
        required
        placeholder="Ссылка на картинку"
        name="link"
      />
      <span
        className="input-error input-error_valid"
        id="avatar-link-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
