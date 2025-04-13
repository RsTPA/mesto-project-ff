export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach(form => {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(form, settings);
  });
}

function setEventListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
    // Добавляем начальную проверку при загрузке страницы
    checkInputValidity(form, input, settings);
  });
}

function checkInputValidity(form, input, settings) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  
  // Проверяем существование элемента перед работой с ним
  if (!input || !errorElement) return;

  if (input.validity.valid) {
    hideInputError(input, errorElement, settings);
  } else {
    showInputError(input, errorElement, settings);
  }
}

function showInputError(input, errorElement, settings) {
  if (!input || !errorElement) return;
  
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(input, errorElement, settings) {
  if (!input || !errorElement) return;
  
  input.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (!buttonElement) return;
  
  const hasInvalidInput = inputList.some(input => !input.validity.valid);
  
  if (hasInvalidInput) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}