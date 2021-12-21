import '../pages/index.css';

import { config } from '../utils/constants.js';
import { initialCards } from '../utils/constants.js';
import { editButton } from '../utils/constants.js';
import { addButton } from '../utils/constants.js';
import { formEditCard } from '../utils/constants.js';
import { formAddCard } from '../utils/constants.js';
import { nameInput } from '../utils/constants.js';
import { jobInput } from '../utils/constants.js';
import { placeInput } from '../utils/constants.js';
import { linkInput } from '../utils/constants.js';
import { listElement } from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const popupWithImage = new PopupWithImage('.popup_type_card');

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template', popupWithImage.open);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    popupWithImage.setEventListeners();
  }
},
  listElement
)

cardList.renderItems();

// создаем экземпляр класса форм
const addFormValidator = new FormValidator(config, formAddCard);
const editFormValidator = new FormValidator(config, formEditCard);

// функции проверки форм
addFormValidator.enableValidation();
editFormValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__job');


const popupEditForm = new PopupWithForm('.popup_type_edit', (input) => {
  userInfo.setUserInfo(input);
  popupEditForm.close();
})

popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo()
  nameInput.value = info.name;
  jobInput.value = info.job;
  editFormValidator.resetValidation();
  popupEditForm.open();
});

const popupAddForm = new PopupWithForm('.popup_type_add', () => {
  const itemCard = {
    name: placeInput.value,
    link: linkInput.value
  }
  const card = new Card(itemCard, '.template', popupWithImage.open);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  popupAddForm.close();
}
)

popupAddForm.setEventListeners();

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  popupAddForm.open()
});

//добавляем каждому popup - popup_transition для плавности анимации
window.addEventListener('load', () => {
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
});

