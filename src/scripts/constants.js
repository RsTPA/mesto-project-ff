export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: 'c1ea7b87-e2e2-4138-b96c-91392bd27845',
    'Content-Type': 'application/json'
  }
};

export const ERROR_MESSAGES = {
  SERVER_ERROR: 'Ошибка соединения с сервером',
  PROFILE_UPDATE: 'Не удалось обновить профиль',
  AVATAR_UPDATE: 'Не удалось обновить аватар',
  CARD_ADD: 'Не удалось добавить карточку',
  CARD_DELETE: 'Не удалось удалить карточку',
  LIKE: 'Не удалось поставить лайк'
};

export const DEFAULT_BUTTON_TEXTS = {
  SAVE: 'Сохранить',
  CREATE: 'Создать',
  DELETE: 'Да',
  LOADING: 'Сохранение...'
};

export const RENDER_METHODS = {
  APPEND: 'append',
  PREPEND: 'prepend'
};

export const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};