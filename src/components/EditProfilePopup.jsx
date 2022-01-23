import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm //Попап редактирования профиля
      name="edit_form"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        type="text"
        id="name"
        className="popup__input popup__input_type_name"
        name="name"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="input-error input-error_valid" id="name-error"></span>
      <input
        type="text"
        id="text"
        className="popup__input popup__input_type_text"
        name="job"
        minLength="2"
        maxLength="200"
        required
        placeholder="Вид деятельности"
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="input-error input-error_valid" id="text-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
