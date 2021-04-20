import {openPopup} from './index.js'

export class Card {
  constructor(cardData, cardSelector){
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate () {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__image').alt = ("Фотография " + this._name);
    this._element.querySelector('.elements__image').src = this._link;
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
    const expandImage = document.querySelector('.popup__image');
    const expandHeader = document.querySelector('.popup__image-header');
    const popupExpand = document.querySelector('.popup_type_open-image');//ДИВ со всем про открыть картинку
    expandImage.src = this._link;
    expandHeader.textContent = this._name;
    expandImage.alt = ("Фотография " + this._name);
    openPopup(popupExpand);
  }
}
