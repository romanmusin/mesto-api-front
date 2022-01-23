import React from "react";
import { Link } from "react-router-dom";
//import successReg from "../images/successReg.svg";
//import failedReg from "../images/failedReg.svg";

function Register({ onRegister }) {
  const [userPassword, setUserPassword] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  function handleChangeUserEmail(evt) {
    setUserEmail(evt.target.value);
  }

  function handleChangeUserPassword(evt) {
    setUserPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister({
      password: userPassword,
      email: userEmail,
    });
  }

  return (
    <div className="login">
      <h2 className="login__title"> Регистрация </h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          className="login__input"
          placeholder="Email"
          onChange={handleChangeUserEmail}
          value={userEmail}
        />
        <input
          type="password"
          id="password"
          className="login__input"
          placeholder="Пароль"
          onChange={handleChangeUserPassword}
          value={userPassword}
        />
        <button type="submit" className="login__button">
          Зарегистрироваться
        </button>
      </form>

      <div className="login__link">
        <Link className="login__link_sign" to="signin">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
