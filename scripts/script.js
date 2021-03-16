let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let formElement = popup.querySelector('.popup__form');
let closeButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__description');
let profileName =  document.querySelector('.profile__name-text');
let profileDescription = document.querySelector('.profile__description');

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeEditPopup ();
}



editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);