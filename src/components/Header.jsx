import React from "react";
import logo from "../images/header_logo.svg";
import { Route, Link } from "react-router-dom";

const Header = ({ email, onSignOut }) => {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__info">
        <Route exact path="/signin">
          <Link to="signup" className="header__title">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/signup">
          <Link to="signin" className="header__title">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <p className="header__email">{email}</p>
          <button onClick={onSignOut} className="header__signout">
            Выйти
          </button>
        </Route>
      </div>
    </header>
  );
};

export default Header;
