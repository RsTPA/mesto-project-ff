export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    error.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  _toggleButtonState() {
    const isValid = this._inputs.every(input => input.validity.valid);
    
    if (isValid) {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = true;
    }
  }

  _setEventListeners() {
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputs.forEach(input => {
      this._hideError(input);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }
}