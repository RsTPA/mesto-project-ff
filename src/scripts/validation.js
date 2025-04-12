const showInputError = (formElement, inputElement, errorMessage, settings) => {
  if (!formElement || !inputElement || !settings) return;

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!errorElement) return;

  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  if (!formElement || !inputElement || !settings) return;

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!errorElement) return;

  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement || !inputElement.validity) return;

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage || 'Некорректный формат');
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return inputElement && inputElement.validity && !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (!buttonElement || !settings) return;

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, settings) => {
  if (!formElement || !settings) return;

  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  if (!inputList || !buttonElement) return;

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    if (!inputElement) return;
    
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });

    inputElement.addEventListener('blur', () => {
      checkInputValidity(formElement, inputElement, settings);
    });
  });
};

export const enableValidation = (settings) => {
  if (!settings) {
    console.error('Не переданы настройки валидации');
    return;
  }

  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  if (!formList || formList.length === 0) return;

  formList.forEach((formElement) => {
    if (formElement) {
      setEventListeners(formElement, settings);
    }
  });
};

export const clearValidation = (formElement, settings) => {
  if (!formElement || !settings) return;

  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  if (!inputList || !buttonElement) return;

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
    if (inputElement) {
      inputElement.setCustomValidity("");
    }
  });

  toggleButtonState(inputList, buttonElement, settings);
};