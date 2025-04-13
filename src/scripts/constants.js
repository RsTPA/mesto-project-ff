export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
      authorization: 'c1ea7b87-e2e2-4138-b96c-91392bd27845',
      'Content-Type': 'application/json'
    }
  };
  
  export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };