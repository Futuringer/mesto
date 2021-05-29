
export const initialCards = [
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

export const popupEdit = document.querySelector('.popup_type_edit'); //ДИВ со всем про окно редактирования
export const editButton = document.querySelector('.profile__edit-button');//кнопка с карандашом
export const editFormElement = popupEdit.querySelector('.popup__form');  // ФОРМА редактирования профиля
export const editNameInput = popupEdit.querySelector('.popup__input_type_name');//поле ввода имени
export const editJobInput = popupEdit.querySelector('.popup__input_type_description');//поле ввода дескрипшн
export const popupExpand = document.querySelector('.popup_type_open-image');//ДИВ со всем про открыть картинку
export const popupAddCard = document.querySelector('.popup_type_add-card'); //ДИВ со всем про добавит карту
export const addCardButton = document.querySelector('.profile__add-button');
export const addCardFormElement = popupAddCard.querySelector('.popup__form'); //ФОРМА создания новой карты
export const template = '#newCard';
export const imagePopupSelector = '.popup_type_open-image';
export const AddCardPopupSelector = '.popup_type_add-card';
export const userNameSelector = '.profile__name-text';
export const userDescSelector = '.profile__description';
export const EditPopupSelector = '.popup_type_edit';
export const ConfirmPopupSelector = '.popup_type_confirm';
export const nameUserName = document.querySelector('.popup__input_type_name').name;
export const nameUserDescription = document.querySelector('.popup__input_type_description').name;
export const userAvatar = document.querySelector('.profile__image')
export const container = ".elements__list";
export const formConfig = {
  formSelector: '.popup__form',    //Все формы
  inputSelector: '.popup__input',   // Инпуты
  submitButtonSelector: '.popup__submit',   //Кнопка сабмит
  inactiveButtonClass: 'popup__submit_disabled',  //Класс отключающий Сабмит кнопку
  inputErrorClass: 'popup__input_type_error',  //Класс который изменяет стиль формы когда неВалид
  errorClass: 'popup__error_visible' // показываем текст ошибки
}
