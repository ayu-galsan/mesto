const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const form = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function openPopup() {
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup)

function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup)

function popupClickHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup()
  }
}
popup.addEventListener('mouseup', popupClickHandler)

function formSubmitHandler(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
form.addEventListener('submit', formSubmitHandler)

