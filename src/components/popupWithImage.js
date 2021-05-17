import Popup from './popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super (popupSelector);
      this._expandImage = document.querySelector('.popup__image');
      this._expandHeader = document.querySelector('.popup__image-header');
  }

  open(data) {
    super.open();
    this._expandImage.src = data.link;
    this._expandHeader.textContent = data.name;
    this._expandImage.alt = ("Фотография " + data.name);
  }
}
