
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
  ConfirmPopupSelector,
  nameUserName,
  nameUserDescription,
  userAvatar,
  formConfig,
  container
} from '../utils/constants.js'

let tempCard = null;
let ownerID = null;

const editFormValidation = new FormValidator(formConfig, editFormElement);
editFormValidation.enableValidation();  //активировли валидацию на форме редактирования информации
const addCardFormValidation = new FormValidator(formConfig, addCardFormElement);
addCardFormValidation.enableValidation(); //активировли валидацию на форме создания новой карты

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
    api.addCard(item)
      .then((res)=>{

    const card = createCard(res,template)
    const cardElement = card;
    cardList.setItem(cardElement, 'prepend');
    addCardFormValidation.disableSubmitButton();
    addCardPopup.close();
    })
  }
})

const confirmPopup = new PopupWithConfirm(ConfirmPopupSelector, {
  submit: (data) => {

    api.deleteCard(data)
      .then(() => {
        console.log(tempCard + 'tempCard');
        tempCard.removeFromDOM();
        tempCard = null;
        //card.handleCardDelete();
      })
      /*.then(() => {
        //tempCard = null;
        //document.location.reload();
        confirmPopup.close();
        //cardList.renderItems(api.getCardsInfo())
        /*api.getCardsInfo()
        .then((data)=>{
          document.querySelectorAll('.elements__item').innerHTML = '12312313';
          //cardList.renderItems(data);
        })
      })*/
      .catch((err) => {
        console.log(err);
      })
  }
})


addCardPopup.setEventListeners();
const user = new UserInfo({   //Инициализируем экземпляр класса ответсвтенного за отрисвку инорфмации о пользователе на странице
  name: userNameSelector,
  description: userDescSelector,
  avatar: userAvatar});



const cardList = new Section({    //Экземпляр класса отвечающий за отрисовку ПРЕЗАГРУЖЕННЫХ КАРТ
  //data: initialCards,
  renderer: (item) => {
    let card = null;
    if (item.owner._id === currentUserId) {
       card = createCard(item,template, 'true')
    }
    else {
       card = createCard(item,template, 'false')
    }
    //const card = createCard(item,template, ownCard)
    const cardElement = card;
    console.log(card);
    cardList.setItem(cardElement,'append');
    //console.log(currentUserId);
  }
},container);



const createCard = (cardData, cardTemplate, ownCard) => {
  const card = new Card(cardData, cardTemplate,ownCard,{
    handleCardClick: item => imagePopup.open(item),
    handleDeleteClick: (data) => {
      tempCard = card;
      confirmPopup.open(data);
    },
  });
  return card.generateCard();
}

const editInfoPopup = new PopupWithForm(EditPopupSelector,{  //Экземпляр класса работающий с формой СОЗДАНИЯ КАРТОЧКИ
  submit: (item) => {
    user.setUserInfo({
      name: item[nameUserName],
      about: item[nameUserDescription],
    })
    api.setUserInfo(item)
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

let currentUserId = null;

Promise.all([api.getCardsInfo(), api.getUserInfo()])
    .then(([cards, userData]) => {
        user.setUserInfo(userData);
        user.setUserAvatar(userData);
       // avatarImg.style.backgroundImage = `url(${userData.avatar})`;
        currentUserId = userData._id;
        console.log('asdasd');
        cardList.renderItems(cards);
    })
    .catch((err) => {
        console.log(`${err}`);
    });
