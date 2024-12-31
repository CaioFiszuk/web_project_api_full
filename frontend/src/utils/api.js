import * as token from "./token.js";

class Api {
    constructor(options) {
      this._baseURL = options.baseUrl;
      this._headers = options.headers;
    }

    _getAuthorizationHeaders() {
      return {
        ...this._headers,
        authorization: `Bearer ${token.getToken()}`,
      }
    }
  
    editProfile(name, about) {
      return fetch(`${this._baseURL}/users/me`, {
        method: "PATCH",
        headers: this._getAuthorizationHeaders(),
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
        headers: this._getAuthorizationHeaders(),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    addCard(name, link, owner) {
      return fetch(`${this._baseURL}/cards`, {
        method: "POST",
        headers: this._getAuthorizationHeaders(),
        body: JSON.stringify({
          name: `${name}`,
          link: `${link}`,
          owner: `${owner}`
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => {
        console.error("Error adding card:", error);
        throw error;
      });
    }
  
    toLike(id) {
      return fetch(`${this._baseURL}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._getAuthorizationHeaders(),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    toDislike(id) {
      return fetch(`${this._baseURL}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._getAuthorizationHeaders(),
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
        headers: this._getAuthorizationHeaders(),
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
        headers: this._getAuthorizationHeaders(),
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
    baseUrl: "https://web-project-api-full-e1h6.onrender.com",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };
  