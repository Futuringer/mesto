import Popup from './Popup.js';
import {Card} from "../pages/index.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, {submit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submit = submit;
    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  _submitEvtHandler() {
    this._submit(this._data);
    this._form.removeEventListener('submit', this._submitEvtHandler);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitEvtHandler();
      //document.location.reload();
      //api.deleteCard(this._data);
      this.close();
    });

  }

  open(data) {
    console.log('confirm');
    this._data = data;
    console.log(this._data);
    super.open();
    this.setEventListeners();
  }
}


/*setEventListeners() {
  super.setEventListeners();
  this._popup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._submit(this._getInputValues())})
}*/