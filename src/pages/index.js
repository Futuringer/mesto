
import './index.css';
import {FormValidator} from '../components/Validate.js';
import {Card} from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import {
  editAvatarPopupSelector,
  avatarEdditButton,
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
  ConfirmPopupSelector,
  nameUserName,
  nameUserDescription,
  userAvatar,
  formConfig,
  avatarFormElement,
  container
} from '../utils/constants.js'

const editFormValidation = new FormValidator(formConfig, editFormElement);
editFormValidation.enableValidation();  //активировли валидацию на форме редактирования информации
const addCardFormValidation = new FormValidator(formConfig, addCardFormElement);
addCardFormValidation.enableValidation(); //активировли валидацию на форме создания новой карты
const avatarEditFormValidation =  new FormValidator(formConfig, avatarFormElement);
avatarEditFormValidation.enableValidation();

const imagePopup = new PopupWithImage(imagePopupSelector);    //попап открытой картинки
imagePopup.setEventListeners();

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '0308ef52-354f-4228-a90e-eeca2348fa65',
    'Content-Type': 'application/json'
  }
})

const addCardPopup = new PopupWithForm(AddCardPopupSelector, {
  submit: (item) => {
    addCardPopup.renderLoading(true)
    api.addCard(item)
      .then((res)=>{
    const card = createCard(res,template,true)
    const cardElement = card;
    cardList.setItem(cardElement, 'prepend');
    addCardFormValidation.disableSubmitButton();
    addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(()=> addCardPopup.renderLoading(false))
  }
})
addCardPopup.setEventListeners();

const editAvatarPopup = new PopupWithForm(editAvatarPopupSelector, {
  submit:(item) =>{
    editAvatarPopup.renderLoading(true)
    api.changeAvatar(item)
      .then((res)=> {
        editAvatarPopup.close();
        user.setUserAvatar(item);
      })
      .catch((err) =>
      console.log(err))
      .finally(()=>{
        editAvatarPopup.renderLoading(false)
      })
  }
})
editAvatarPopup.setEventListeners();

avatarEdditButton.addEventListener('click',()=> {
  avatarEditFormValidation.disableSubmitButton();
  editAvatarPopup.open();
})
let tempCard = null;
const confirmPopup = new PopupWithConfirm(ConfirmPopupSelector, {
  submit: (data) => {
    api.deleteCard(data)
      .then(() => {
        tempCard.removeFromDOM();
        tempCard = null;
        confirmPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
})

const user = new UserInfo({   //Инициализируем экземпляр класса ответсвтенного за отрисвку инорфмации о пользователе на странице
  name: userNameSelector,
  description: userDescSelector,
  avatar: userAvatar});

const cardList = new Section({    //Экземпляр класса отвечающий за отрисовку ПРЕЗАГРУЖЕННЫХ КАРТ
  renderer: (item) => {
    let card = null;
    if (item.owner._id === currentUserId) {
      card = createCard(item,template, true)
    }
    else {
      card = createCard(item,template, false)
    }
    const cardElement = card;
    cardList.setItem(cardElement,'append');
  }
},container);

const createCard = (cardData, cardTemplate, ownCard) => {
  const card = new Card(cardData, cardTemplate,ownCard, api,{
    handleCardClick: item => imagePopup.open(item),
    handleDeleteClick: (data) => {
      tempCard = card;
      confirmPopup.open(data);
    }
  });
  return card.generateCard();
}

const editInfoPopup = new PopupWithForm(EditPopupSelector,{  //Экземпляр класса работающий с формой СОЗДАНИЯ КАРТОЧКИ
  submit: (item) => {
    editInfoPopup.renderLoading(true)
    api.setUserInfo(item)
    .then(()=> {
      user.setUserInfo({
        name: item[nameUserName],
        about: item[nameUserDescription],
      })
      editInfoPopup.close();
    })
    .catch((err) =>
    console.log(err))
    .finally(()=>{
      editInfoPopup.renderLoading(false)
    })
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

export let currentUserId = null;
Promise.all([api.getCardsInfo(), api.getUserInfo()])
    .then(([cards, userData]) => {
        user.setUserInfo(userData);
        user.setUserAvatar(userData);
        currentUserId = userData._id;
        cardList.renderItems(cards);
    })
    .catch((err) => {
        console.log(`${err}`);
    });
