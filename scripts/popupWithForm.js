import Popup from './popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector,{submit}){
    super (popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

close(){
  super.close();
  this._form.reset();
}

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues())})
  }
}
