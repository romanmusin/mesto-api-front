/*
export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.romus.mesto.nomoredomains.work"
    : "http://localhost:3000";
*/

class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._getResponse);
  }

  login(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then(this._getResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._getResponse);
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  }
}

const auth = new Auth ({
  baseUrl:
  process.env.NODE_ENV === "production"
    ? "https://api.romus.mesto.nomoredomains.work"
    : "http://localhost:3000",
});

export default auth;
