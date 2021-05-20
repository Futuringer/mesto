
import './index.css';
import {FormValidator} from '../components/Validate.js';
import {Card} from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  editButton,
  editFormElement,
  editNameInput,
  editJobInput,
  addCardButton,
  addCardFormElement,
  template,
  imagePopupSelector,
  AddCardPopupSelector,
  userNameSelector,
  userDescSelector,
  EditPopupSelector,
  nameUserName,
  nameUserDescription,
  formConfig,
  container
} from '../utils/constants.js'

const editFormValidation = new FormValidator(formConfig, editFormElement);
editFormValidation.enableValidation();  //активировли валидацию на форме редактирования информации
const addCardFormValidation = new FormValidator(formConfig, addCardFormElement);
addCardFormValidation.enableValidation(); //активировли валидацию на форме создания новой карты

const imagePopup = new PopupWithImage(imagePopupSelector);    //попап открытой картинки
imagePopup.setEventListeners();

const createCard = (cardData, cardTemplate) => {
  const card = new Card(cardData, cardTemplate,{
    handleCardClick: item => imagePopup.open(item)
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

