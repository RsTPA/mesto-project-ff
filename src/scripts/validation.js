function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
  
  function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
  
  function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  }
  
  function toggleButtonState(inputs, buttonElement, config) {
    const isValid = inputs.every(input => input.validity.valid);
    if (isValid) {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }
  
  function setEventListeners(formElement, config) {
    const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(formElement, input, config);
        toggleButtonState(inputs, buttonElement, config);
      });
    });
  }
  
  export function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach(form => {
      setEventListeners(form, config);
    });
  }
  
  export function clearValidation(formElement, config) {
    const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    inputs.forEach(input => {
      hideInputError(formElement, input, config);
    });
  
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  }