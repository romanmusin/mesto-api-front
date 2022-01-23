import { baseUrl } from './auth'

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponse);
  }

  getCardsInfo() {
    return fetch(`${baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponse);
  }

  addCard({ name, link }) {
    return fetch(`${baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponse);
  }

  setUserInfo(data) {
    return fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponse);
  }

  editAvatar(data) {
    return fetch(`${baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponse);
  }

  toggleLike(id, isLiked) {
    return fetch(`${baseUrl}/cards/likes/${id}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._getResponse);
  }
}

const api = new Api({
  url: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
