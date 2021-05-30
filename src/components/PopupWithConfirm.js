import Popup from './Popup.js';
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
      this.close();
    });
  }

  open(data) {
    this._data = data;
    super.open();
    this.setEventListeners();
  }
}
