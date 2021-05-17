
import {FormValidator} from './validate.js'
import {Card} from './card.js'
import Section from './section.js'
import Popup from './popup.js'
import PopupWithImage from './popupWithImage.js';
import PopupWithForm from './popupWithForm.js';
import UserInfo from './userInfo.js';

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

const container = ".elements__list";
const imagePopup = new PopupWithImage('.popup_type_open-image');
imagePopup.setEventListeners();


const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    console.log('index');
    const card = new Card(item, template,{
      handleCardClick: (item) =>{ imagePopup.open(item)}
    });
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
},container);

cardList.renderItems();

const addCardPopup = new PopupWithForm('.popup_type_add-card',{  //Экземпляр класса работающий с формой СОЗДАНИЯ КАРТОЧКИ
  submit: (item) => {
    const item2 = {};         //нам приходит из  popupWithForm объект с ключами равными именам полей, перестариваем ключи под формат карты
    const keys = Object.keys(item)
    item2.name = item[keys[0]];
    item2.link = item[keys[1]];
    //делаем объект чтоб передавать одним значением в создание новой карты
    const card = new Card(item2, template,{
      handleCardClick: (item2) =>{ imagePopup.open(item2)}
    });
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
    addCardPopup.close();
  }
});
addCardPopup.setEventListeners();

const user = new UserInfo({
  name:'.profile__name-text',
  description: '.profile__description'});

const editInfoPopup = new PopupWithForm('.popup_type_edit',{  //Экземпляр класса работающий с формой СОЗДАНИЯ КАРТОЧКИ
  submit: (item) => {
  const keys = Object.keys(item)
   user.setUserInfo({
     name: item[keys[0]],
     description: item[keys[1]]
   })
   editInfoPopup.close();
  }
});
editInfoPopup.setEventListeners();

editButton.addEventListener('click', () => {
  const infoToPreload = user.getUserInfo();
  editNameInput.value = infoToPreload.a;
  editJobInput.value = infoToPreload.b;
  editFormValidation.enableSubmitButton(); //вызываем функцию класса валидации активирующиую сабмит
  editInfoPopup.open();
});


addCardButton.addEventListener('click',() => {
  addCardPopup.open();;
})

