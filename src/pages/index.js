import Api from '../components/Api.js';

import '../pages/index.css';

import { config } from '../utils/constants.js';
//import { initialCards } from '../utils/constants.js';
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


const userInfo = new UserInfo('.profile__name', '.profile__job');
const api = new Api({
  adress: "https://mesto.nomoreparties.co/v1/cohort-32",
  token: "aa423f91-d0a1-4966-9ae7-163cc71f5190"
})

/* api.getInitialCards()
 .then(res => {
   cardList.renderItems(res)
 })
 .catch(err => {
   console.log("Ошибка:", err)
 })

 api.getUserData() 
   .then(res => {
     console.log(userInfo.setUserInfo(res.name, res.about))
   })
   .catch(err => {
     console.log("Ошибка:", err)
   }) */

Promise.all([api.getUserData(), api.getInitialCards()])
 
.then(([userData, cards]) => {
  debugger
    userInfo.setUserInfo(userData.data)
    console.log(userInfo.getUserInfo(userData.name, userData.about))
    console.log(userData);
    cardList.renderItems(cards)
  })
  




const popupWithImage = new PopupWithImage('.popup_type_card');

function createCard(item) {
  const card = new Card(item, '.template', popupWithImage.open);
  const cardElement = card.generateCard();
  return cardElement
}

popupWithImage.setEventListeners();

const cardList = new Section({
  //items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
  '.elements'
)

//cardList.renderItems();

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



const popupEditForm = new PopupWithForm('.popup_type_edit', () => {
  //userInfo.setUserInfo(input);
  popupEditForm.close();
  api.editProfile({
    name: userInfo.getUserInfo().name,
    about: userInfo.getUserInfo().about
  })
    .then(res => console.log(userInfo.setUserInfo(res)))
    .catch(err => console.log(err))    
})

popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.about;
  formValidators[formEditCard.getAttribute('name')].resetValidation();
  popupEditForm.open(); 
  console.dir(nameInput);
  console.dir(jobInput); 
});

const popupAddForm = new PopupWithForm('.popup_type_add', (input) => {
  popupAddForm.close();
 /*  api.addNewCard({
    name: input.place,
    link: input.link
  })
  .then(res => cardList.addItem(createCard(res.place, res.link)))
  .catch(err => console.log(err)) */
 const itemCard = {
    name: input.place,
    link: input.link
  }
  cardList.addItem(createCard(itemCard)); 
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

