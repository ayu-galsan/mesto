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
