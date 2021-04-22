
import {FormValidator} from './validate.js'
import {Card} from './card.js'

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupEdit = document.querySelector('.popup_type_edit'); //ДИВ со всем про окно редактирования
const editButton = document.querySelector('.profile__edit-button');//кнопка с карандашом
const editFormElement = popupEdit.querySelector('.popup__form');  // ФОРМА редактирования профиля
const editNameInput = popupEdit.querySelector('.popup__input_type_name');//поле ввода имени
const editJobInput = popupEdit.querySelector('.popup__input_type_description');//поле ввода дескрипшн
const profileName =  document.querySelector('.profile__name-text');
const profileDescription = document.querySelector('.profile__description');
export const popupExpand = document.querySelector('.popup_type_open-image');//ДИВ со всем про открыть картинку
const popupAddCard = document.querySelector('.popup_type_add-card'); //ДИВ со всем про добавит карту
const addCardPlaceInput = popupAddCard.querySelector('.popup__input_type_place');//поле ввода названия нового места
const addCardLinkInput = popupAddCard.querySelector('.popup__input_type_link');//поле ввода ссылки
const addCardButton = document.querySelector('.profile__add-button');
const addCardFormElement = popupAddCard.querySelector('.popup__form'); //ФОРМА создания новой карты
const elementsList = document.querySelector('.elements__list'); //записываем в ДОМ наши карточки
const template = '#newCard';
const expandImage = document.querySelector('.popup__image');
const expandHeader = document.querySelector('.popup__image-header');

const formConfig = {
  formSelector: '.popup__form',    //Все формы
  inputSelector: '.popup__input',   // Инпуты
  submitButtonSelector: '.popup__submit',   //Кнопка сабмит
  inactiveButtonClass: 'popup__submit_disabled',  //Класс отключающий Сабмит кнопку
  inputErrorClass: 'popup__input_type_error',  //Класс который изменяет стиль формы когда неВалид
  errorClass: 'popup__error_visible' // показываем текст ошибки
}

const editFormValidation = new FormValidator(formConfig, editFormElement);
editFormValidation.enableValidation();
const addCardFormValidation = new FormValidator(formConfig, addCardFormElement);
addCardFormValidation.enableValidation();


function renderCard(data, template) {
  const card = new Card(data, template);
  return card.generateCard(); //создаем и возвращаем новый элемент
};

function addInDom (wrap, element) {//добавляем новый элемент в ДОМ
  wrap.prepend(element);
}

initialCards.forEach((item) => addInDom (elementsList, renderCard(item, template)));

function handleAddCardFormSubmit (evt) { //обработчик нажатия на сабмит формы создания новой карты
  evt.preventDefault(); //делаем объект чтоб передавать одним значением в создание новой карты
  const cardData =  {
    name: addCardPlaceInput.value,
    link: addCardLinkInput.value
  };

  addInDom(elementsList, renderCard(cardData, template));
  addCardFormValidation.disableSubmitButton();//вызываем функцию класса валидации деактивирующиую сабмит
  clearForm(addCardFormElement);
  closePopup(popupAddCard);
}

export function openPopup(popup) { //открыть попап
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
}

function handleEscUp (evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
    }
}

function clearForm(form) { //очищаем форму
  form.reset();
}

function closePopup (popup) { //открыть попап
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscUp);
}

function receiveInfo (targetField, inputField) { //получаем информацию из форм
  targetField.textContent = inputField.value;
}

function preloadEditInfo () {  //подгружаем информацию о имени и деятельности при открытии окна редактирования
  editNameInput.value = profileName.textContent;
  editJobInput.value = profileDescription.textContent;
}

function handleEditFormSubmit (evt) {  //обработчик нажатия на сабмит формы редактированияпрофиля
  evt.preventDefault();
  receiveInfo(profileName, editNameInput);
  receiveInfo(profileDescription, editJobInput);
  closePopup (popupEdit);
}

export function OpenImagePopup (name, link) {//функция заполнения значений формы раскрытия картинки
  expandImage.src = link;
  expandHeader.textContent = name;
  expandImage.alt = ("Фотография " + name);
}

editButton.addEventListener('click', () => {
  preloadEditInfo();
  editFormValidation.enableSubmitButton(); //вызываем функцию класса валидации активирующиую сабмит
  openPopup(popupEdit);
});

function handlePopupClosure(evt) {//обработчик событий кликов по оверлэю и крестику всех форм
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.target.closest('.popup'));
  }
}

popupEdit.addEventListener('click', (evt) => {
  handlePopupClosure(evt);
});

popupAddCard.addEventListener('click', (evt) => {
  handlePopupClosure(evt);
});

popupExpand.addEventListener('click', (evt) => {
  handlePopupClosure(evt);
});

editFormElement.addEventListener('submit', handleEditFormSubmit);// сабмит редактирования профиля
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit); //сабмит добавления новой карты
addCardButton.addEventListener('click',() => {
  openPopup(popupAddCard);
})

