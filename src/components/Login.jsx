import React from "react";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeName(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ password, email });
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          className="login__input"
          placeholder="Email"
          onChange={handleChangeName}
          value={email}
        />
        <input
          type="password"
          id="password"
          className="login__input"
          placeholder="Пароль"
          onChange={handleChangePassword}
          value={password}
        />
        <button className="login__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
