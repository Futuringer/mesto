

export class Card {
  constructor(data, cardSelector, ownCard, {handleCardClick, handleDeleteClick}){
    this._ownCard = ownCard;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

_getTemplate () {
  const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
  return cardElement;
}

renderLikes(data){
  this._element.querySelector('.elements__likes-counter').textContent = data.likes.length;
}

generateCard() {
  this._element = this._getTemplate();
  this._setEventListeners();
  const elementsImage = this._element.querySelector('.elements__image');
  this._element.querySelector('.elements__title').textContent = this._name;
  elementsImage.alt = ("Фотография " + this._name);
  elementsImage.src = this._link;
  this.renderLikes(this._data);
  if(this._ownCard==='false'){
    this._element.querySelector('.elements__delete-button').style.display = 'none';
  }
  return this._element;
}



_setEventListeners() {
  this._element.querySelector('.elements__like-button').addEventListener('click', () => {
    this._handleCardLike();
  })
  this._element.querySelector('.elements__delete-button').addEventListener('click', ()=> {
    this.handleCardDelete();
  })
  this._element.querySelector('.elements__image').addEventListener('click', () => {
    this._handleCardOpen();
  })
}

_handleCardLike() {
  this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_liked');
}

handleCardDelete() {
  this._handleDeleteClick(this._data);
  //
 // api.deleteCard(this._data);
}

removeFromDOM() {
  this._element.remove();
}

_handleCardOpen() {
  this._handleCardClick({name: this._name, link: this._link,});
  }
}
