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

formAddCard.addEventListener('submit', handleFormAddCardSubmit)//при отправке данных - вызов функции «отправки» формы handleFormAddCardSubmit
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