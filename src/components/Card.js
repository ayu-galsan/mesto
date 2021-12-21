export default class Card {
  constructor(data, cardselector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardselector = cardselector;
    this._openPopup = openPopup;
  }

  //связываем класс с разметкой
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardselector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  //добавляем в разметку данные 
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__delete')
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  //добавляем обработчики событий
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => this._handleLikeClick());
    this._elementDelete.addEventListener('click', () => this._remove());
    this._elementImage.addEventListener('click', () => this._handleCardClick());
  }

  _handleLikeClick() {
    this._elementLike.classList.toggle('element__like_active');
  }

  _remove() {
    this._element.remove();
  }

  _handleCardClick = () => {
    this._openPopup({name: this._name, link: this._link});
  }

}
