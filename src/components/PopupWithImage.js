import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageInPopup = this._popup.querySelector('.popup__image');
    this._captionInPopup = this._popup.querySelector('.popup__caption');
  }
  open = (item) => {
    super.open();
    this._imageInPopup.src = item.link;
    this._imageInPopup.alt = item.name;
    this._captionInPopup.textContent = item.name;
  }
}
