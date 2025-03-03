
// Открытие попапов

function openPopup (popup) {

  popup.classList.add('popup_is-opened');

}

// Закрытие попапов

function closePopup (popup) {

  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');

}

function mousedownPopup (evt, popup) {

  if (evt.target === evt.currentTarget) { 
    closePopup(popup); 
  } 

}

function escapePopup (evt, popup) {

  if (evt.key === 'Escape') {
    closePopup(popup); 
  }

}

export {openPopup, closePopup, mousedownPopup, escapePopup};