import { ERROR_MESSAGES } from './constants.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: 'c1ea7b87-e2e2-4138-b96c-91392bd27845',
    'Content-Type': 'application/json'
  }
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status}: ${res.statusText}`);
};

const handleError = (error, customMessage) => {
  console.error(`${customMessage}:`, error);
  throw new Error(ERROR_MESSAGES[customMessage] || ERROR_MESSAGES.SERVER_ERROR);
};

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(handleResponse)
    .catch(error => handleError(error, 'PROFILE_LOAD'));
};

export const updateProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
    .then(handleResponse)
    .catch(error => handleError(error, 'PROFILE_UPDATE'));
};

export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  })
    .then(handleResponse)
    .catch(error => handleError(error, 'AVATAR_UPDATE'));
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponse)
    .catch(error => handleError(error, 'CARDS_LOAD'));
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
    .then(handleResponse)
    .catch(error => handleError(error, 'CARD_ADD'));
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleResponse)
    .catch(error => handleError(error, 'CARD_DELETE'));
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(handleResponse)
    .catch(error => handleError(error, 'LIKE'));
};

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleResponse)
    .catch(error => handleError(error, 'LIKE'));
};