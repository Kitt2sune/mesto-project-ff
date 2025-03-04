
// Открытие попапов

function openPopup (popup) {

  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => {escapePopup(evt)}); 

}

// Закрытие попапов

function closePopup (popup) {

  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (evt) => {escapePopup(evt)})

}

function mousedownPopup (evt, popup) {

  if (evt.target === evt.currentTarget) { 
    closePopup(popup); 
  } 

}

function escapePopup (evt) {

  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened')); 
  }

}

export {openPopup, closePopup, mousedownPopup};