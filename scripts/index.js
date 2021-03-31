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

function handleLikeClick (likeElement) {//функция поставить/снять лайк
  likeElement.classList.toggle('elements__like-button_liked');
}

function handleCardDelete (deleteElement) { //удаляем карту по кнопке мусорного бочка
  const imageItem = deleteElement.closest('.elements__item');
  imageItem.remove();
}

function handleExpandPopup (elementImage, elementTitle) { //функция раскрытия картинки
  expandImage.src = elementImage.src;
  expandHeader.textContent = elementTitle.textContent;
  expandImage.alt = ("Фотография " + elementTitle.textContent);
  openPopup(popupExpand);
}

function createNewCard (cardData) {  //функция создания новой карточки. Отсылать сюда a.NAME a.LINK
  const newCard  = cardTemplate.cloneNode(true);
  newCard.querySelector('.elements__title').textContent = cardData.name;
  newCard.querySelector('.elements__image').alt = ("Фотография " + cardData.name); //alt
  newCard.querySelector('.elements__image').src = cardData.link;
  const cardLike = newCard.querySelector('.elements__like-button');
  cardLike.addEventListener('click', () =>  //смотрим не кликают ли по лайку
    handleLikeClick(cardLike));

  const cardDelete = newCard.querySelector('.elements__delete-button');
  cardDelete.addEventListener('click', () => handleCardDelete(cardDelete));//смотрим не кликают ли по мусорному бочонку

  const cardImage = newCard.querySelector('.elements__image');
  const cardTitle = newCard.querySelector('.elements__title');
  cardImage.addEventListener('click', () => handleExpandPopup(cardImage, cardTitle));//смотрим не кликают ли по картинке чтоб ее открыть
  return newCard;
}

function renderCard(data, wrap) {    
  wrap.prepend(createNewCard(data))
};

const elementsList = document.querySelector('.elements__list'); //записываем в ДОМ наши карточки
initialCards.forEach((item) => renderCard(item, elementsList));

function handleAddCardFormSubmit (evt) { //обработчик нажатия на сабмит формы создания новой карты
  evt.preventDefault(); //делаем объект чтоб передавать одним значением в создание новой карты
  const cardData =  {
    name: addCardPlaceInput.value,
    link: addCardLinkInput.value
  };
  renderCard(cardData, elementsList);
  clearForm(addCardFormElement);
  closePopup(popupAddCard);
}

function openPopup(popup) { //закрыть попап
  popup.classList.add('popup_opened')
}

function clearForm(form) { //очищаем форму
  form.reset();
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

function handleEditFormSubmit (evt) {  //обработчик нажатия на сабмит формы редактированияпрофиля
  evt.preventDefault();
  receiveInfo(profileName, editNameInput);
  receiveInfo(profileDescription, editJobInput);
  closePopup (popupEdit);
}

expandCloseButton.addEventListener('click', () => closePopup (popupExpand)); //закрыть форму просмотра большого изображения

editButton.addEventListener('click', () => {
  preloadEditInfo();
  openPopup(popupEdit)});//функция открытия окна редактирования

editCloseButton.addEventListener('click', () => closePopup(popupEdit));//закрыть редактирование профиля
addCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));//закрыть создание карточки
editFormElement.addEventListener('submit', handleEditFormSubmit);// сабмит редактирования профиля

addCardFormElement.addEventListener('submit', handleAddCardFormSubmit); //сабмит добавления новой карты
addCardButton.addEventListener('click', () => openPopup(popupAddCard)); //открыть форму создания новой карточки
