import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupLists = Array.from(document.querySelectorAll('.popup'));
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const profileSubmitButton = popupEditProfile.querySelector('.popup__submit-button');
const newCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const formEditCard = document.querySelector('.popup__form_edit-card');
const formAddCard = document.querySelector('.popup__form_add-card');
const nameInput = document.querySelector('.popup__input_el_name');
const jobInput = document.querySelector('.popup__input_el_job');
const placeInput = document.querySelector('.popup__input_el_place');
const linkInput = document.querySelector('.popup__input_el_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const listElement = document.querySelector('.elements');
const ESC_KEY = "Escape";

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  likeButtonSelector: '.element__like',
  imageSelector: '.element__image',
  titleSelector: '.element__title',
  deleteButtonSelector: '.element__delete',
  elementsSelector: '.elements',
  elementSelector: '.element',
  activeLikeClass: 'element__like_active'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функция создания карточек
function createCard(item) {
  // Создадим экземпляр карточки
  const card = new Card(item, '.template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
}

// функция отображения карточек 
function prependCard(item) {
  const cardElement = createCard(item);
  listElement.prepend(cardElement);
}

initialCards.forEach((item) => {
  prependCard(item)
});

// создаем экземпляр класса форм
const addFormValidator = new FormValidator(config, formAddCard);
const editFormValidator = new FormValidator(config, formEditCard);

// функции проверки форм
addFormValidator.enableValidation();
editFormValidator.enableValidation();

// Обработчик открытия класса popup
export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

// Обработчик закрытия класса popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

//Закрытие попапов кликом на оверлей по кнопке closeButton
popupLists.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
})

//Функция закрытия попапа нажатием на клавишу Esc.
function closeByEsc(evt) {
  if (evt.key === ESC_KEY) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

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
  nameInput.value = profileName.textContent;// получаем значение полей jobInput и nameInput из свойства value
  jobInput.value = profileJob.textContent;
  editFormValidator.resetValidation();
  openPopup(popupEditProfile);
});

// при клике по элементу addButton - вызов функции открытия класса popup - popup_add-card
addButton.addEventListener('click', (evt) => {
  formAddCard.reset();
  addFormValidator.resetValidation();
  openPopup(popupAddCard);
});

//добавляем каждому popup - popup_transition для плавности анимации
window.addEventListener('load', () => {
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
});

