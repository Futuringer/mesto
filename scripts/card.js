

export class Card {
  constructor(cardData, cardSelector,{handleCardClick}){
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate () {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const elementsImage =   this._element.querySelector('.elements__image');
    this._element.querySelector('.elements__title').textContent = this._name;
    elementsImage.alt = ("Фотография " + this._name);
    elementsImage.src = this._link;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this._handleCardLike();
    })
    this._element.querySelector('.elements__delete-button').addEventListener('click', ()=> {
      this._handleCardDelete();
    })
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardOpen();
    })
  }

  _handleCardLike() {
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_liked');
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _handleCardOpen() {
    this._handleCardClick(this._cardData);

  }
}
