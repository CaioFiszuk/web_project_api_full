import * as token from "./token.js";

class Api {
    constructor(options) {
      this._baseURL = options.baseUrl;
      this._headers = options.headers;
    }
  
    getUserInfo() {
      return fetch(`${this._baseURL}/users/me`, {
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    editProfile(name, about) {
      return fetch(`${this._baseURL}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: `${name}`,
          about: `${about}`,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    getInitialCards() {
      return fetch(`${this._baseURL}/cards`, {
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    addCard(name, link) {
      return fetch(`${this._baseURL}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: `${name}`,
          link: `${link}`,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    toLike(id) {
      return fetch(`${this._baseURL}/cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    toDislike(id) {
      return fetch(`${this._baseURL}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    deleteCard(id) {
      return fetch(`${this._baseURL}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    updateAvatar(avatar) {
      return fetch(`${this._baseURL}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: `${avatar}`,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  }
  
  const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      authorization: token.getToken(),
      "Content-Type": "application/json",
    },
  });
  
  export { api };
  