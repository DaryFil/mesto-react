import { settings } from "./constants.js";

class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // _request(endpoint, options) {
  //   return fetch("${this._address}${endpoint}", options).then(
  //     this._checkAnswer
  //   );
  // }
  // не до конца поняла как именно делать код более универсальным, писала вот так, код ломается
  // getUserInfo() {
  // this._request(`/users/me`, {
  //     method: "GET",
  //headers: this._headers,
  //   });
  // }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",

      headers: this._headers,
    }).then(this._checkAnswer);
  }

  saveUserInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",

      headers: this._headers,

      body: JSON.stringify({ name: name, about: about }),
    }).then(this._checkAnswer);
  }

  saveUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",

      headers: this._headers,

      body: JSON.stringify({ avatar: avatar }),
    }).then(this._checkAnswer);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",

      headers: this._headers,
    }).then(this._checkAnswer);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: "POST",

      headers: this._headers,

      body: JSON.stringify({ name: name, link: link }),
    }).then(this._checkAnswer);
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: "DELETE",

      headers: this._headers,
    }).then(this._checkAnswer);
  }

  addLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: "PUT",

      headers: this._headers,
    }).then(this._checkAnswer);
  }

  removeLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: "DELETE",

      headers: this._headers,
    }).then(this._checkAnswer);
  }
}

const api = new Api(settings);
export default api;
