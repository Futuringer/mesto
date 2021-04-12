
const showInputError = (formElement, inputElement, errorMessage, formConfig) => {
  // Берем форму, достаем из нее класс спана, добавляем ему видимость
  //берем поле инпута, добавляем ему класс неВалидности
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(formConfig['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formConfig['errorClass']);
};

const hideInputError = (formElement, inputElement, formConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formConfig['inputErrorClass']);
  errorElement.classList.remove(formConfig['errorClass']);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, то TRUE
    return !inputElement.validity.valid;
  })
};

const checkInputValidity = (formElement, inputElement, formConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formConfig);
  } else {
    hideInputError(formElement, inputElement, formConfig);
  }
};

const toggleButtonState = (inputList, buttonElement, formConfig) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(formConfig['inactiveButtonClass']);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(formConfig['inactiveButtonClass']);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement,formConfig) => {
  //Находим все Инпуты внутри одной переданнойформы
  const inputList = Array.from(formElement.querySelectorAll(formConfig['inputSelector']));
  const buttonElement = formElement.querySelector(formConfig['submitButtonSelector']);
  toggleButtonState(inputList, buttonElement, formConfig);
  // Каждому инпуту добавляем обработчик событий на ввод и после каждой буквы вызываем checkInputValidity
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement,formConfig);
      toggleButtonState(inputList, buttonElement, formConfig);
    });
  });
};

const enableValidation = (formConfig) => {
  const formList = Array.from(document.querySelectorAll(formConfig['formSelector']));
  //Создаем массив из всех форм с классом formSelector
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement,formConfig);
  });
};

const formConfig = {
  formSelector: '.popup__form',    //Все формы
  inputSelector: '.popup__input',   // Инпуты
  submitButtonSelector: '.popup__submit',   //Кнопка сабмит
  inactiveButtonClass: 'popup__submit_disabled',  //Класс отключающий Сабмит кнопку
  inputErrorClass: 'popup__input_type_error',  //Класс который изменяет стиль формы когда неВалид
  errorClass: 'popup__error_visible' // показываем текст ошибки
}

enableValidation(formConfig); //запускаем цепочку функций валидации

