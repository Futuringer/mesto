import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super (popupSelector);
      this._expandImage = document.querySelector(popupSelector).querySelector('.popup__image');
      this._expandHeader = document.querySelector(popupSelector).querySelector('.popup__image-header');
  }

  open(data) {
    super.open();
    this._expandImage.src = data.link;
    this._expandHeader.textContent = data.name;
    this._expandImage.alt = ("Фотография " + data.name);
  }
}
