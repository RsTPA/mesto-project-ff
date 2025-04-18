export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "c1ea7b87-e2e2-4138-b96c-91392bd27845",
    "Content-Type": "application/json",
  },
};

const request = (endpoint, options = {}) => {
  return fetch(`${config.baseUrl}${endpoint}`, {
    ...options,
    headers: config.headers
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

export const getUserInfo = () => request('/users/me');

export const getInitialCards = () => request('/cards');

export const updateUserInfo = (name, about) => {
  return request('/users/me', {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  });
};

export const addCard = (name, link) => {
  return request('/cards', {
    method: "POST",
    body: JSON.stringify({ name, link }),
  });
};

export const deleteCardFromApi = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
  });
};

export const putLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
  });
};

export const deleteLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
  });
};

export const updateAvatar = (avatarLink) => {
  return request('/users/me/avatar', {
    method: "PATCH",
    body: JSON.stringify({ avatar: avatarLink }),
  });
};