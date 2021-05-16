import Popup from './popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector){
    super (popupSelector);
  }

  open(data) {
    super.open();

  }
}
