
export class FormValidator{
  constructor(formConfig, formToValidate)
  {
    this._formConfig = formConfig;
    this._formToValidate = formToValidate;
    this._buttonElement = this._formToValidate.querySelector(this._formConfig['submitButtonSelector']);//кнопка сабмитаформы с которой мы работаем
  }

  _setEventListeners() {
  //Находим все Инпуты внутри одной переданнойформы
    const inputList = Array.from(this._formToValidate.querySelectorAll(this._formConfig['inputSelector']));
    this._toggleButtonState(inputList);
    // Каждому инпуту добавляем обработчик событий на ввод и после каждой буквы вызываем checkInputValidity
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  };

  disableSubmitButton() {//деактивируем кнопку сабмита
    this._buttonElement.classList.add(this._formConfig['inactiveButtonClass']);
    this._buttonElement.disbaled = true;
  }

  enableSubmitButton() {//активируем  кнопку сабмита
    this._buttonElement.classList.remove(this._formConfig['inactiveButtonClass']);
    this._buttonElement.disbaled = false;
  }


  _checkInputValidity = (inputElement) => {//после каждого символа проверяем нужно ли нам идти в функцию показа ошибки
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState = (inputList) => {//проверяем на валидность всем поля, если не проходим - замораживаем кнопку сабмита
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formToValidate.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formConfig['inputErrorClass']);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formConfig['errorClass']);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formToValidate.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formConfig['inputErrorClass']);
    errorElement.classList.remove(this._formConfig['errorClass']);
    errorElement.textContent = '';
  };

  _hasInvalidInput = (inputList) => {//идем по всем полям ввода и возвращаем true если где-то не валидно
    return inputList.some((inputElement) => {
      // Если поле не валидно, то TRUE
      return !inputElement.validity.valid;
    })
  };

updateButtonState() {
  const inputList = Array.from(this._formToValidate.querySelectorAll(this._formConfig['inputSelector']));
    inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
};

  enableValidation () {//запускаем валидацию
    this._setEventListeners();
  }
}

