// Модуль валидации форм

function showInputError ({ formElement, inputElement, inputErrorClass, errorClass, errorMessage }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
};

function hideInputError ({ formElement, inputElement, inputErrorClass,  errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

function checkInputValidity ({ formElement, inputElement, inputErrorClass, errorClass }) {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.validationMessage;
    showInputError({ formElement, inputElement, inputErrorClass, errorClass, errorMessage });
  } else {
    hideInputError({ formElement, inputElement, inputErrorClass, errorClass });
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState ({ inputList, submitButtonElement, inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.disable = true;
    submitButtonElement.classList.add(inactiveButtonClass);
  } else {
    submitButtonElement.disable = false;
    submitButtonElement.classList.remove(inactiveButtonClass);
  }
};

function setEventListeners ({ formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState({ inputList, submitButtonElement, inactiveButtonClass });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity({ formElement, inputElement, inputErrorClass, errorClass });
      toggleButtonState({ inputList, submitButtonElement, inactiveButtonClass });
    });
  });
};

export function enableValidation ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners({ formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass });
  });
};

export function clearValidation (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError({ formElement, inputElement, inputErrorClass, errorClass });
  });

  toggleButtonState({ inputList, submitButtonElement, inactiveButtonClass });
};