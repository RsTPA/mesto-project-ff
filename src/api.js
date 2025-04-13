class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    // Загрузка информации о пользователе
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  
    // Загрузка карточек
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  
    // Редактирование профиля
    editProfile({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this._checkResponse);
    }
  
    // Добавление новой карточки
    addNewCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(this._checkResponse);
    }
  
    // Удаление карточки
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  
    // Постановка лайка
    likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  
    // Снятие лайка
    unlikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  
    // Обновление аватара
    updateAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar
        })
      })
      .then(this._checkResponse);
    }
  }
  
  // Инициализация API
  const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
      authorization: 'c1ea7b87-e2e2-4138-b96c-91392bd27845',
      'Content-Type': 'application/json'
    }
  });
  
  export default api;