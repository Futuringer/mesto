
export class Card {
  constructor(data, cardSelector, ownCard, api, {handleCardClick, handleDeleteClick}){
    this._api = api;
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
  if(!this._ownCard){
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

handleCardDelete() {
  this._handleDeleteClick(this._data);
}

removeFromDOM() {
  this._element.remove();
}

_handleCardOpen() {
  this._handleCardClick({name: this._name, link: this._link,});
  }

  /*_handleCardLike() {
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_liked');
  }*/
  _handleCardLike() {
    const likeButton = this._element.querySelector('.elements__like-button');
    const likesCounter = this._element.querySelector('.elements__likes-counter');
    if(!(likeButton.classList.contains('elements__like-button_liked'))) {
      this._api.likeCard(this._id)
        .then((data) => {
          likeButton.classList.add('elements__like-button_liked');
          likesCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._api.unlikeCard(this._id)
        .then((data) => {
          likeButton.classList.remove('elements__like-button_liked');
          likesCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }


}
