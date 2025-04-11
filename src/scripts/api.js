const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
    headers: {
      authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
      'Content-Type': 'application/json'
    }
  };
  
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(checkResponse);
  }
  
  export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(checkResponse);
  }
  
  export function updateProfile(data) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
    })
      .then(checkResponse);
  }
  
  export function updateAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar })
    })
      .then(checkResponse);
  }
  
  export function addCard(data) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(data)
    })
      .then(checkResponse);
  }
  
  export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
  }
  
  export function likeCard(cardId, method) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method,
      headers: config.headers
    })
      .then(checkResponse);
  }