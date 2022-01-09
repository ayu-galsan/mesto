export default class Card {
  constructor(data, cardselector, userId, openPopup, handleDelete, addLike, deleteLike) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._cardselector = cardselector;
    this._userId = userId;
    this._openPopup = openPopup;
    this._handleDelete = handleDelete;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
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
    this._likesCount = this._element.querySelector('.element__likesCount');
    this._elementDelete = this._element.querySelector('.element__delete');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    if (this._ownerId === this._userId) {
      this._elementDelete;
    } else {
      this._elementDelete.remove();
    }
    const checkLike = this._likes.some(({ _id }) => _id === this._userId);
    if (checkLike === true) {
      this._elementLike.classList.add('element__like_active');
    }
    this._likesCount.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }

  //добавляем обработчики событий
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => this._handleLikeClick());
    this._elementDelete.addEventListener('click', () => this._handleDelete());
    this._elementImage.addEventListener('click', () => this._handleCardClick());
  }

  _handleLikeClick() {
    this._elementLike.classList.toggle('element__like_active');
    this._addLike(this);
    this._deleteLike(this);
  }

  _handleLikeClick() {
    if (this._elementLike.classList.contains('element__like_active')) {
      this._elementLike.classList.remove('element__like_active');
      this._deleteLike(this);
    }
    else {
      this._elementLike.classList.add('element__like_active');
      this._addLike(this)
    }
  }

  setLikesCount(data) {
    this._likesCount.textContent = data.likes.length;
  }

  deleteCard() {
    this._element.remove();
  }

  _handleCardClick = () => {
    this._openPopup({ name: this._name, link: this._link });
  }

}
