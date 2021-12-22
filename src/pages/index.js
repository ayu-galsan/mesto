import '../pages/index.css';

import { config } from '../utils/constants.js';
import { initialCards } from '../utils/constants.js';
import { editButton } from '../utils/constants.js';
import { addButton } from '../utils/constants.js';
import { formEditCard } from '../utils/constants.js';
import { formAddCard } from '../utils/constants.js';
import { nameInput } from '../utils/constants.js';
import { jobInput } from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const popupWithImage = new PopupWithImage('.popup_type_card');

function createCard(item) {
  const card = new Card(item, '.template', popupWithImage.open);
  const cardElement = card.generateCard();
  return cardElement
}

popupWithImage.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
  '.elements'
)

cardList.renderItems();

//создаем универсальный экземпляр валидаторов всех форм
const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
    // записываем в объект под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

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
  formValidators[formEditCard.getAttribute('name')].resetValidation();
  popupEditForm.open();
});

const popupAddForm = new PopupWithForm('.popup_type_add', (input) => {
  const itemCard = {
    name: input.place,
    link: input.link
  }
  cardList.addItem(createCard(itemCard));
  popupAddForm.close();
}
)

popupAddForm.setEventListeners();

addButton.addEventListener('click', () => {
  formValidators[formAddCard.getAttribute('name')].resetValidation();
  popupAddForm.open()
});

//добавляем каждому popup - popup_transition для плавности анимации
window.addEventListener('load', () => {
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
});

