console.log(`hello`);
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');

function openEditPopup () {
  popup.classList.add('popup_opened');
}

function closeEditPopup () {
  popup.classList.remove('popup_opened');
}

function popupFilling (fieldClass, valueClass) {
  let field = document.querySelector(fieldClass);
  let value = document.querySelector(valueClass);
  field.value = value.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
	let nameInput = document.querySelector('.popup__name');
	let jobInput = document.querySelector('.popup__description');
  console.log(nameInput.value);
  document.querySelector('.profile__name-text').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closeEditPopup ();
}


popupFilling ('.popup__name','.profile__name-text');
popupFilling ('.popup__description','.profile__description');
editButton.addEventListener('click', openEditPopup);
closeButton.addEventListener('click', closeEditPopup);
/*document.querySelector('.popup__submit').addEventListener('click',formSubmitHandler);*/
formElement.addEventListener('submit', formSubmitHandler); /*form="popup__form"  разобраться почему не давал сработать*/