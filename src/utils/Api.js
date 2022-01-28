
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._getResponse);
  }

  getCardsInfo() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._getResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponse);
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._getResponse);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._getResponse);
  }
}

const api = new Api({
  url: process.env.NODE_ENV === "production"
  ? "https://api.romus.mesto.nomoredomains.work"
  : "http://localhost:3000",
  headers: {
    //Authorization: `Bearer ${document.cookie.search('jwt')}` ,
    "Content-Type": "application/json",
  },
});

export default api;
