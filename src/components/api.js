export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "c1ea7b87-e2e2-4138-b96c-91392bd27845",
    "Content-Type": "application/json",
  }, 
};  

//функция для обработки ответа  
const handleResponse = (res) => {  
  if (!res.ok) {  
    return Promise.reject(`Ошибка: ${res.status}`);  
  }  
  return res.json();  
};  

export const getUserInfo = () => {  
  return fetch(`${config.baseUrl}/users/me`, {  
    headers: config.headers,  
  }).then(handleResponse);  
};  

export const getInitialCards = () => {  
  return fetch(`${config.baseUrl}/cards`, {  
    headers: config.headers,  
  }).then(handleResponse);  
};  

export const updateUserInfo = (name, about) => {  
  return fetch(`${config.baseUrl}/users/me`, {  
    method: "PATCH",  
    headers: config.headers,  
    body: JSON.stringify({  
      name: name,  
      about: about,  
    }),  
  }).then(handleResponse);  
};  

export const addCard = (name, link) => {  
  return fetch(`${config.baseUrl}/cards`, {  
    method: "POST",  
    headers: config.headers,  
    body: JSON.stringify({  
      name: name,  
      link: link,  
    }),  
  }).then(handleResponse);  
};  

export const deleteCardFromApi = (cardId) => {  
  return fetch(`${config.baseUrl}/cards/${cardId}`, {  
    method: "DELETE",  
    headers: config.headers,  
  }).then(handleResponse);  
};  

//функция для лайка карточки
export const putLike = (cardId) => {  
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {  
    method: "PUT",  
    headers: config.headers,  
  }).then(handleResponse);  
};  

//функция для удаления лайка карточки
export const deleteLike = (cardId) => {  
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {  
    method: "DELETE",  
    headers: config.headers,  
  }).then(handleResponse);  
};  

//функция для обновления аватара
export const updateAvatar = (avatarLink) => {  
  return fetch(`${config.baseUrl}/users/me/avatar`, {  
    method: "PATCH",  
    headers: config.headers,  
    body: JSON.stringify({ avatar: avatarLink }),  
  }).then(handleResponse);  
};  

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};