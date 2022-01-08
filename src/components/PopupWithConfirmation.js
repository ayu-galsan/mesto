import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setSubmit = (action) => {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => this._handleFormSubmit())
  }
}
