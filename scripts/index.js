const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const form = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_el_name');
const jobInput = document.querySelector('.popup__input_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
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

const listElement = document.querySelector('.elements');
const templateItem = document.querySelector('.template').content; // получаем содержимое template

initialCards.forEach(prependCard)

function createCard(item){
  const cardElement = templateItem.querySelector('.element').cloneNode(true); // клонируем содержимое template
  cardElement.querySelector('.element__image').setAttribute ('src', item.link); // наполняем содержимым - ссылка на картинку
  cardElement.querySelector('.element__title').textContent = item.name; // наполняем содержимым - надпись под картинкой
  return cardElement;
}

function prependCard(item){
  const cardElement = createCard(item);
  listElement.prepend(cardElement); // отображаем карточки
}


// Обработчик открытия класса popup
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;// получаем значение полей jobInput и nameInput из свойства value
  jobInput.value = profileJob.textContent;
}
// Обработчик закрытия класса popup
function closePopup() {
  popup.classList.remove('popup_opened');
}
// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault() //отмена стандартной отправки формы
  profileName.textContent = nameInput.value;// получаем значение полей jobInput и nameInput из свойства value
  profileJob.textContent = jobInput.value;//и выбираем элементы, куда должны быть вставлены значения полей с помощью textContent
  closePopup();//подключаем функцию закрытия класса popup
}

form.addEventListener('submit', formSubmitHandler)//при отправке данных - вызов функции «отправки» формы formSubmitHandler
editButton.addEventListener('click', openPopup)// при клике по элементу editButton - вызов функции открытия класса popup
closeButton.addEventListener('click', closePopup)// при клике по элементу closeButton - вызов функции закрытия класса popup

