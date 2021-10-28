const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupOpenCard = document.querySelector('.popup_type_card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const formEditCard = document.querySelector('.popup__form_edit-card');
const nameInput = document.querySelector('.popup__input_el_name');
const jobInput = document.querySelector('.popup__input_el_job');
const placeInput = document.querySelector('.popup__input_el_place');
const linkInput = document.querySelector('.popup__input_el_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const listElement = document.querySelector('.elements');
const templateItem = document.querySelector('.template').content;
const formAddCard = document.querySelector('.popup__form_add-card');
const imageInPopup = document.querySelector('.popup__image');
const captionInPopup = document.querySelector('.popup__caption');


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = ' ';
  errorElement.classList.remove('popup__input-error_active');
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

//функция hasInvalidInput принимает массив формы, 
//проверяет наличие невалидного поля и указывает можно ли разблокировать кнопку сабмита
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//функция toggleButtonState включает/отключает кнопку
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_inactive');
  }
  else {
    buttonElement.classList.remove('popup__save_inactive');
  }
}

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();

//Функция закрытия попапа кликом на оверлей
function popupClickHandler(evt) {
  console.log(evt.target);
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

popup.addEventListener('mouseup', popupClickHandler);

//Функция закрытия попапа нажатием на клавишу Esc.
function keyHandler (evt) {
  if (evt.key === "Escape") {
    closePopup(popup);
}
}

popup.addEventListener('keydown', keyHandler); 


/*form.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid); 


formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function (evt) {
  console.log (evt.target.validity);
});*/







initialCards.forEach(prependCard)

// функция создания карточек
function createCard(item) {
  const cardElement = templateItem.querySelector('.element').cloneNode(true); // клонируем содержимое template
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardDelete = cardElement.querySelector('.element__delete'); // обьявляем переменные
  cardImage.src = item.link; // наполняем содержимым - ссылка на картинку
  cardImage.alt = item.name; // текст, если картинка не загрузится
  cardTitle.textContent = item.name; // наполняем содержимым - надпись под картинкой
  cardDelete.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove(); // удаляем карточки путем нажатия на кнопку 'element__delete'
  });
  cardImage.addEventListener('click', function (evt) {
    evt.preventDefault();
    const elementCard = evt.target.closest('.element');
    const elementImageSrc = elementCard.querySelector('.element__image').src;
    const elementImageAlt = elementCard.querySelector('.element__image').alt;
    openBigCard(elementImageSrc, elementImageAlt);
  });
  return cardElement;
}

//функция открытия popup_type_card
function openBigCard(src, alt) {
  imageInPopup.src = src;
  imageInPopup.alt = alt;
  captionInPopup.textContent = alt;
  openPopup(popupOpenCard);
}

// функция отображения карточек 
function prependCard(item) {
  const cardElement = createCard(item);
  const cardLike = cardElement.querySelector('.element__like');
  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  }); //переключаем стиль для активного 'лайка'
  listElement.prepend(cardElement);
}

// Обработчик открытия класса popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Обработчик закрытия класса popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//закрытие попапов по кнопке closeButton
closeButtons.forEach((item) => {
  item.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'))
  });
});

// Обработчик «отправки» формы добавления карточек
function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  const itemCard = {
    name: placeInput.value,
    link: linkInput.value
  }
  prependCard(itemCard);
  closePopup(popupAddCard);
}

// Обработчик «отправки» формы редактирования профиля
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault() //отмена стандартной отправки формы
  profileName.textContent = nameInput.value;// получаем значение полей jobInput и nameInput из свойства value
  profileJob.textContent = jobInput.value;//и выбираем элементы, куда должны быть вставлены значения полей с помощью textContent
  closePopup(popupEditProfile);//подключаем функцию закрытия класса popup
}

formAddCard.addEventListener('submit', handleFormAddCardSubmit,)//при отправке данных - вызов функции «отправки» формы handleFormAddCardSubmit
formEditCard.addEventListener('submit', handleFormEditProfileSubmit)//при отправке данных - вызов функции «отправки» формы handleFormEditProfileSubmit

// при клике по элементу editButton - вызов функции открытия класса popup - popupEditProfile
editButton.addEventListener('click', (evt) => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;// получаем значение полей jobInput и nameInput из свойства value
  jobInput.value = profileJob.textContent;
});

// при клике по элементу addButton - вызов функции открытия класса popup - popup_add-card
addButton.addEventListener('click', (evt) => {
  openPopup(popupAddCard);
});

//добавляем каждому popup - popup_transition для плавности анимации
window.addEventListener('load', () => {
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
});

