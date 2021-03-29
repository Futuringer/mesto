const popupEdit = document.querySelector('.popup_type_edit'); //ДИВ со всем про окно редактирования
const editButton = document.querySelector('.profile__edit-button');//кнопка с карандашом
const editFormElement = popupEdit.querySelector('.popup__form');  // ФОРМА редактирования профиля
const editCloseButton = popupEdit.querySelector('.popup__close-button');//кнопка закрытия окна редактирования
const editNameInput = popupEdit.querySelector('.popup__input_type_name');//поле ввода имени
const editJobInput = popupEdit.querySelector('.popup__input_type_description');//поле ввода дескрипшн
const profileName =  document.querySelector('.profile__name-text');
const profileDescription = document.querySelector('.profile__description');
const popupExpand = document.querySelector('.popup_type_open-image');//ДИВ со всем про открыть картинку
const expandImage = popupExpand.querySelector('.popup__image');
const expandHeader = popupExpand.querySelector('.popup__image-header');
const expandCloseButton = popupExpand.querySelector('.popup__close-button');
const popupAddCard = document.querySelector('.popup_type_add-card'); //ДИВ со всем про добавит карту
const addCardCloseButton = popupAddCard.querySelector('.popup__close-button');//кнопка закрытия окна просмотра картинки
const addCardPlaceInput = popupAddCard.querySelector('.popup__input_type_place');//поле ввода названия нового места
const addCardLinkInput = popupAddCard.querySelector('.popup__input_type_link');//поле ввода ссылки
const addCardButton = document.querySelector('.profile__add-button');
const addCardFormElement = popupAddCard.querySelector('.popup__form'); //ФОРМА создания новой карты

const cardTemplate = document.querySelector('#newCard').content; //темплэйт создания карточки
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

function toggleLike (likeElement) {//функция поставить/снять лайк
  likeElement.classList.toggle('elements__like-button_liked');
}

function deleteCard (deleteElement) { //удаляем карту по кнопке мусорного бочка
  const imageItem = deleteElement.closest('.elements__item');
  imageItem.remove();
}

function openExpandPopup (elementImage, elementTitle) { //функция раскрытия картинки
  expandImage.src = elementImage.src;
  expandHeader.textContent = elementTitle.textContent;
  expandImage.alt = ("Фотография " + elementTitle.textContent);
  openPopup(popupExpand);
}

function createNewCard (name,link) {  //функция создания новой карточки
  const newCard  = cardTemplate.cloneNode(true);
  newCard.querySelector('.elements__title').textContent = name;
  newCard.querySelector('.elements__image').alt = ("Фотография " + name); //alt
  newCard.querySelector('.elements__image').src = link;
  const cardLike = newCard.querySelector('.elements__like-button');
  cardLike.addEventListener('click', function(){  //смотрим не кликают ли по лайку
    toggleLike(cardLike);
  })
  const cardDelete = newCard.querySelector('.elements__delete-button');
  cardDelete.addEventListener('click', function(){  //смотрим не кликают ли по мусорному бочонку
    deleteCard(cardDelete);
  })
  const cardImage = newCard.querySelector('.elements__image');
  const cardTitle = newCard.querySelector('.elements__title');
  cardImage.addEventListener('click', function(){  //смотрим не кликают ли по картинке чтоб ее открыть
    openExpandPopup(cardImage, cardTitle);
  })
  return newCard;
}

const elementsList = document.querySelector('.elements__list'); //записываем в ДОМ наши карточки
initialCards.forEach(function(item) {
  elementsList.prepend(createNewCard (item.name, item.link))
});

function addCardFormSubmitHandler (evt) { //обработчик нажатия на сабмит формы создания новой карты
  evt.preventDefault();
  elementsList.prepend(createNewCard (addCardPlaceInput.value, addCardLinkInput.value))
  closePopup (popupAddCard);
}

function openPopup(popup) { //закрыть попап
  popup.classList.add('popup_opened')
}

function closePopup (popup) { //открыть попап
  popup.classList.remove('popup_opened');
}

function receiveInfo (targetField, inputField) { //получаем информацию из форм
  targetField.textContent = inputField.value;
}

function preloadEditInfo () {  //подгружаем информацию о имени и деятельности при открытии окна редактирования
  editNameInput.value = profileName.textContent;
  editJobInput.value = profileDescription.textContent;
}

function editFormSubmitHandler (evt) {  //обработчик нажатия на сабмит формы редактированияпрофиля
  evt.preventDefault();
  receiveInfo(profileName, editNameInput);
  receiveInfo(profileDescription, editJobInput);
  closePopup (popupEdit);
}

expandCloseButton.addEventListener('click', function(){  //закрыть форму просмотра большого изображения
  closePopup (popupExpand);
})

editButton.addEventListener('click', function() { //функция открытия окна редактирования
  preloadEditInfo();
  openPopup(popupEdit)});

editCloseButton.addEventListener('click', function() {closePopup(popupEdit)});//закрыть редактирование профиля
addCardCloseButton.addEventListener('click', function() {closePopup(popupAddCard)});//закрыть создание карточки
editFormElement.addEventListener('submit', editFormSubmitHandler);// сабмит редактирования профиля

addCardFormElement.addEventListener('submit', addCardFormSubmitHandler); //сабмит добавления новой карты
addCardButton.addEventListener('click', function() { //открыть форму создания новой карточки
  openPopup(popupAddCard)});
