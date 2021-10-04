const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const form = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_el_name');
const jobInput = document.querySelector('.popup__input_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Обработчик открытия класса popup
function openPopup() {
  popup.classList.add('popup_opened');
}
// Обработчик закрытия класса popup
function closePopup() {
  popup.classList.remove('popup_opened');
}
// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault() //отмена стандартной отправки формы
  profileName.textContent = nameInput.value;// получаем значение полей jobInput и nameInput из свойства value
  profileJob.textContent = jobInput.value;//и выбираем элементы, куда должны быть вставлены значения полей с помощью textContent
  closePopup();//подключаем функцию закрытия класса popup
}

form.addEventListener('submit', formSubmitHandler)//при отправке данных - вызов функции «отправки» формы formSubmitHandler
editButton.addEventListener('click', openPopup)// при клике по элементу editButton - вызов функции открытия класса popup
closeButton.addEventListener('click', closePopup)// при клике по элементу closeButton - вызов функции закрытия класса popup