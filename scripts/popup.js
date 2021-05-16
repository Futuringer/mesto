export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }
  __handleEscClose(evt){
    console.log('handelr');
    if (evt.key === "Escape") {
      this.close();
      }
  }

  __handleClickClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      this.close;
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this.__handleEscClose.bind(Popup));
    document.addEventListener('keydown', this.__handleClickClose.bind(Popup));
  }

}
