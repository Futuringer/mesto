
import './index.css';
import {FormValidator} from '../components/Validate.js';
import {Card} from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
export const popupExpand = document.querySelector('.popup_type_open-image');//ДИВ со всем про открыть картинку
const popupAddCard = document.querySelector('.popup_type_add-card'); //ДИВ со всем про добавит карту
const addCardButton = document.querySelector('.profile__add-button');
const addCardFormElement = popupAddCard.querySelector('.popup__form'); //ФОРМА создания новой карты
const template = '#newCard';
const imagePopupSelector = '.popup_type_open-image';
const AddCardPopupSelector = '.popup_type_add-card';
const userNameSelector = '.profile__name-text';
const userDescSelector = '.profile__description';
const EditPopupSelector = '.popup_type_edit';
const nameUserName = document.querySelector('.popup__input_type_name').name;
const nameUserDescription = document.querySelector('.popup__input_type_description').name;
const formConfig = {
  formSelector: '.popup__form',    //Все формы
  inputSelector: '.popup__input',   // Инпуты
  submitButtonSelector: '.popup__submit',   //Кнопка сабмит
  inactiveButtonClass: 'popup__submit_disabled',  //Класс отключающий Сабмит кнопку
  inputErrorClass: 'popup__input_type_error',  //Класс который изменяет стиль формы когда неВалид
  errorClass: 'popup__error_visible' // показываем текст ошибки
}

const editFormValidation = new FormValidator(formConfig, editFormElement);
editFormValidation.enableValidation();  //активировли валидацию на форме редактирования информации
const addCardFormValidation = new FormValidator(formConfig, addCardFormElement);
addCardFormValidation.enableValidation(); //активировли валидацию на форме создания новой карты
const container = ".elements__list";

const imagePopup = new PopupWithImage(imagePopupSelector);    //попап открытой картинки
imagePopup.setEventListeners();

const createCard = (cardData, cardTemplate) => {
  const card = new Card(cardData, cardTemplate,{
    handleCardClick: (item) =>{imagePopup.open(item)}
  });
  return card.generateCard();
}

const cardList = new Section({    //Экземпляр класса отвечающий за отрисовку ПРЕЗАГРУЖЕННЫХ КАРТ
  data: initialCards,
  renderer: (item) => {
    const card = createCard(item,template)
    const cardElement = card;
    cardList.setItem(cardElement);
  }
},container);

cardList.renderItems();

const addCardPopup = new PopupWithForm(AddCardPopupSelector, {
  submit: (item) => {const card = createCard(item,template)
    const cardElement = card;
    cardList.setItem(cardElement);
    addCardFormValidation.disableSubmitButton();
    addCardPopup.close();
  }
});

addCardPopup.setEventListeners();

const user = new UserInfo({   //Инициализируем экземпляр класса ответсвтенного за отрисвку инорфмации о пользователе на странице
  name: userNameSelector,
  description: userDescSelector});
  const editInfoPopup = new PopupWithForm(EditPopupSelector,{  //Экземпляр класса работающий с формой СОЗДАНИЯ КАРТОЧКИ
  submit: (item) => {
    const keys = Object.keys(item)
    user.setUserInfo({
      name: item[nameUserName],
      description: item[nameUserDescription]
    })
    editInfoPopup.close();
  }
});
editInfoPopup.setEventListeners();

editButton.addEventListener('click', () => {  //нажали на кнопку карандаш
  const infoToPreload = user.getUserInfo();
  editFormValidation.updateButtonState();
  editNameInput.value = infoToPreload.userName;
  editJobInput.value = infoToPreload.userOccupation;
  editFormValidation.enableSubmitButton(); //вызываем функцию класса валидации активирующиую сабмит
  editInfoPopup.open();
});

addCardButton.addEventListener('click',() => {
  addCardPopup.open();
  addCardFormValidation.updateButtonState();
})

