const popupEdit = document.querySelector('.popup_type_edit'); //ДИВ со всем про окно редактирования
const popupEditSubmit = popupEdit.querySelector('.popup__submit');
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
const pageContainer = document.querySelector('.page__container');
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
  //Тут я изначально ошибся и после рефакторинга пролема всплыла. Я добавлял кнопке сабмита создания новой карточки класс неактивности при открытии окна
  //тк я удалил функцию toggleButtonState при загрузке и в первый раз она срабатывала после ввода первого символа. В итоге я открывал окно создания новой
  //карточки, поля были пустыми а кнопка горела. Я так сделал тк эта функция срабатывала когда у нас в полях Формы редактирования био было пусто при загрузке
  //страницы а информация в поля вносилась при  открытии формы,но функция при открытии не срабатывала и кнопка была  серой когда поля были заполнены  корректно
  //но не было ввода символов.  Сейчас я переделал так, что  toggleButtonState сразу отрабатывает а у кнопки сабмита формы редактирования при открытии я удаляю
  //класс неактивности,тк там по идее не может быть некорректных данных при открытии.
  //document.querySelector('.popup__submit').add(formConfig.inactiveButtonClass);
  clearForm(addCardFormElement);
  closePopup(popupAddCard);
}

function openPopup(popup) { //открыть попап
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
}

function handleEscUp (evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
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

editButton.addEventListener('click', () => {
  preloadEditInfo();
  popupEditSubmit.classList.remove(formConfig.inactiveButtonClass);
  openPopup(popupEdit);
});

// Не очень понял, имелось ли ввиду тут повесить такой обработчик на каждую форму, querySelectorAll('.popup') и циклом, или через делегирование
pageContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(document.querySelector('.popup_opened'));
  }
});

editFormElement.addEventListener('submit', handleEditFormSubmit);// сабмит редактирования профиля
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit); //сабмит добавления новой карты
addCardButton.addEventListener('click',() => {
  openPopup(popupAddCard);
})
