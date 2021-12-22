export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = [...this._formElement.querySelectorAll(this._config.inputSelector)];
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  // Функция, которая проверяет валидность поля
  _handleFieldValidation(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    }
    else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  // функция, которая проверяет кнопку
  _toggleButtonState() {
    this._buttonElement.disabled = !this._formElement.checkValidity();
    this._buttonElement.classList.toggle(this._config.inactiveButtonClass, !this._formElement.checkValidity());
  }

  // функция обработчик для всех полей формы
  _setFormListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._handleFieldValidation(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }

  // функция, которая сбрасывает классы с ошибкой
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    });
  }

  // функция обработчик для всех форм
  enableValidation() {
    this._setFormListeners();
  }
}





/*
//функция обработчик для всех форм
function enableValidation(validationConfig) {
  const formList = [...document.querySelectorAll(validationConfig.formSelector)];
  formList.forEach((formElement) => setFormListeners(formElement, validationConfig));
}

//функция обработчик для всех полей формы
function setFormListeners(formElement, config) {
  formElement.addEventListener('submit', handleSubmit);
  formElement.addEventListener('input', () => toggleButtonState(formElement, config));
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () =>
      handleFieldValidation(inputElement, formElement, config))
  });
  toggleButtonState(formElement, config);
}

////функция, которая проверяет кнопку
function toggleButtonState(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.disabled = !formElement.checkValidity();
  buttonElement.classList.toggle(config.inactiveButtonClass, !formElement.checkValidity());
}

// Функция, отменяющая отправку формы на сервер
function handleSubmit(evt) {
  evt.preventDefault();
}

// Функция, которая проверяет валидность поля
function handleFieldValidation(inputElement, formElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, formElement, config);
  }
  else {
    hideInputError(inputElement, formElement, config);
  }
}

// Функция, которая добавляет класс с ошибкой
function showInputError(inputElement, formElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
}

// Функция, которая удаляет класс с ошибкой
const hideInputError = (inputElement, formElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Вызовем функцию проверки
enableValidation(config);
 */
