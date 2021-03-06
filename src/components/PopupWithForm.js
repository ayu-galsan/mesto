import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._btnLoader = Array.from(this._form.querySelectorAll('.popup__submit-save'));
    this._btnSubmit = this._form.querySelector('.popup__submit-button')
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(title) {
    this._btnSubmit.textContent = title;
  };

  close() {
    super.close();
    this._form.reset();
  }
}