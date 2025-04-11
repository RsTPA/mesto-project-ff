const checkNameValidity = (inputElement) => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
    return nameRegex.test(inputElement.value);
  };
  
  const getCustomErrorMessage = (inputElement) => {
    return inputElement.dataset.errorMessage || 
           'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
  };
  
  const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, config) => {
    if ((inputElement.name === 'name' || 
         inputElement.name === 'place-name' || 
         inputElement.name === 'description') && 
        inputElement.value && 
        !checkNameValidity(inputElement)) {
      showInputError(formElement, inputElement, getCustomErrorMessage(inputElement), config);
      return false;
    }
  
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
      return false;
    }
  
    hideInputError(formElement, inputElement, config);
    return true;
  };
  
  const toggleButtonState = (inputList, buttonElement, config) => {
    const hasInvalidInput = inputList.some(input => {
      return !checkInputValidity(input.closest(config.formSelector), input, config);
    });
    
    buttonElement.disabled = hasInvalidInput;
    buttonElement.classList.toggle(config.inactiveButtonClass, hasInvalidInput);
  };
  
  export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    
    formList.forEach((formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
      const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, config);
          toggleButtonState(inputList, buttonElement, config);
        });
      });
    });
  };
  
  export const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
    });
  
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  };