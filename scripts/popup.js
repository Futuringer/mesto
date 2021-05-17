export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  //  this._handleClickClose = this._handleClickClose.bind(this);
  }

  open() {
    console.log('asda');
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt){
    if (evt.key === "Escape") {
      this.close();
      }
  }

  _handleClickClose(evt) {
    console.log(this);
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }


  setEventListeners() {
    console.log('LIsteners!');
    this._popup.addEventListener('click', this._handleClickClose.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

}
