import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  setSubmit = (action) => {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => this._handleFormSubmit())
  }
}
