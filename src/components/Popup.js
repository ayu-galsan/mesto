import { ESC_KEY } from "../utils/constants.js";

//класс Popup - отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  //открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //закрытие попапа клавишей Esc
  _handleEscClose = (evt) => {
    if (evt.key === ESC_KEY) {
      this.close();
    }
  }

  //слушатель клика по кнопке закрытия попапа и при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}

