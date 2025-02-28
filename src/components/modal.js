
// Открытие попапов

function popupOpen (popup) {

  popup.classList.add('popup_is-opened');

}

// Закрытие попапов

function popupClose (popup) {

  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');

}

export {popupOpen, popupClose};