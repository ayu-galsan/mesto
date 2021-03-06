import Api from '../components/Api.js';

import '../pages/index.css';

import { config } from '../utils/constants.js';
import { editButton } from '../utils/constants.js';
import { addButton } from '../utils/constants.js';
import { formEditCard } from '../utils/constants.js';
import { formEditAvatar } from '../utils/constants.js';
import { formAddCard } from '../utils/constants.js';
import { nameInput } from '../utils/constants.js';
import { jobInput } from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { profileAvatar } from '../utils/constants.js';

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-32",
  token: "aa423f91-d0a1-4966-9ae7-163cc71f5190"
})


Promise.all([api.getUserData(), api.getInitialCards()])

  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    cardList.renderItems(cards)
  })
  .catch(err => console.log(err))


const popupWithImage = new PopupWithImage('.popup_type_card');
const popupWithConfirmation = new PopupWithConfirmation('.popup_type_delete');
popupWithConfirmation.setEventListeners();

function createCard(item) {
  const card = new Card(item, '.template', userInfo._id, popupWithImage.open,
    () => {
      popupWithConfirmation.open();
      popupWithConfirmation.setSubmit(() => {
        api.deleteCard(item)
          .then(() => {
            card.deleteCard();
            popupWithConfirmation.close();
          })
          .catch(err => console.log(err))
      })
    },
    (card) => {
      api.addLike(item)
        .then(data => card.setLikesCount(data))
        .catch(err => console.log(err))
    },
    (card) => {
      api.deleteLike(item)
        .then(data => card.setLikesCount(data))
        .catch(err => console.log(err))
    }
  )
  const cardElement = card.generateCard();
  return cardElement
}

popupWithImage.setEventListeners();

const cardList = new Section({
  renderer: (item) => {
    cardList.appendItem(createCard(item));
  }
},
  '.elements'
)

//?????????????? ?????????????????????????? ?????????????????? ?????????????????????? ???????? ????????
const formValidators = {};

// ?????????????????? ??????????????????
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // ???????????????? ???????????? ???? ???????????????? `name` ?? ??????????
    const formName = formElement.getAttribute('name');
    // ???????????????????? ?? ???????????? ?????? ???????????? ??????????
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const popupEditForm = new PopupWithForm('.popup_type_edit', (input) => {
  popupEditForm.renderLoading('????????????????????...');
  api.editProfile(input)
    .then(res => {
      userInfo.setUserInfo(res);
      popupEditForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEditForm.renderLoading('??????????????????'))
})

popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.about;
  formValidators[formEditCard.getAttribute('name')].resetValidation();
  popupEditForm.open();
});

const popupAddForm = new PopupWithForm('.popup_type_add', (input) => {
  popupAddForm.renderLoading('????????????????????...');
  api.addNewCard(input)
    .then(res => {
      cardList.addItem(createCard(res));
      popupAddForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAddForm.renderLoading('??????????????'))
})

popupAddForm.setEventListeners();

addButton.addEventListener('click', () => {
  formValidators[formAddCard.getAttribute('name')].resetValidation();
  popupAddForm.open()
});

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', (input) => {
  popupWithAvatar.renderLoading('????????????????????...');
  api.editAvatar(input)
    .then(res => {
      userInfo.setUserInfo(res);
      popupWithAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupWithAvatar.renderLoading('??????????????????'))
})

popupWithAvatar.setEventListeners();

profileAvatar.addEventListener('click', () => {
  formValidators[formEditAvatar.getAttribute('name')].resetValidation();
  popupWithAvatar.open()
});

//?????????????????? ?????????????? popup - popup_transition ?????? ?????????????????? ????????????????
window.addEventListener('load', () => {
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
});

