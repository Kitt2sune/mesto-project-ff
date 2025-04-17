// импорт модулей

import '../pages/index.css'; 
import {openPopup, closePopup, mousedownPopup} from '../components/modal.js';
import {createCard, likeCard, deleteCard} from '../components/card.js'
import {clearValidation, enableValidation} from '../components/validation.js';
import {requestAPI} from '../components/api.js'

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Дом-узлы темплейта

const templateContainer = document.querySelector('.places__list');

// Дом-узлы попапов

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCard = document.querySelector('.popup_type_image');
const popupConfirm = document.querySelector('.popup_type_confirm');
const popups = document.querySelectorAll('.popup');
const popupCardPicture = document.querySelector('.popup__image');
const popupCardContent = document.querySelector('.popup__caption');

// Дом-узлы кнопок

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');

// Дом-узлы форм

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileAbout = profileInfo.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const formEditProfile = document.forms['edit-profile'];
const inputNameEditProfile = formEditProfile['name'];
const inputAboutEditProfile = formEditProfile['description'];
const buttomSubmitEditProfileForm = formEditProfile.querySelector('.button');

const formEditAvatar = document.forms['edit-avatar'];
const profileAvatarSubmitButton = formEditAvatar.querySelector('.popup__button');
const inputAvatar = formEditAvatar.avatar;

const formNewCard = document.forms['new-place'];
const inputNameNewCard = formNewCard['place-name'];
const inputLinkNewCard = formNewCard['link'];
const buttonSubmitAddCardForm = formNewCard.querySelector('.popup__button');

const formConfirm = document.forms['delete-card'];

export function toggleConfirmPopup (flag) {
  if (flag === true) {
    openPopup(popupConfirm);
  } 
  else {
    closePopup(popupConfirm)
  }
}

function setProfile (name, about, avatar) {
  profileName.textContent = name;
  profileAbout.textContent = about;
  profileImage.style.backgroundImage = `url(${avatar})`;
}

// Render saving

function renderLoading (button, flag) {
  button.textContent = flag ? 'Сохранение...' : 'Сохранить';
}

// Обработчик clickов

profileImage.addEventListener('click', () => { 

  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupEditAvatar);

});

buttonNewCard.addEventListener('click', () => {

  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openPopup(popupNewCard);
  
});

buttonEdit.addEventListener('click', () => { 

  inputAboutEditProfile.value = profileAbout.textContent;
  inputNameEditProfile.value = profileName.textContent;
  openPopup(popupEditProfile);

});


//Обработчик submitов

formEditAvatar.addEventListener('submit', (evt) => {submitAvatarForm(evt)});
formEditProfile.addEventListener('submit', (evt) => {submitProfileForm(evt)});
formNewCard.addEventListener('submit', (evt) => {submitAddCardForm(evt)});
formConfirm.addEventListener('submit', (evt) => {deleteCard(evt)});

function submitAddCardForm(evt) {

  evt.preventDefault();
  renderLoading(buttonSubmitAddCardForm, true);

  requestAPI.addCard({name: inputNameNewCard.value, link: inputLinkNewCard.value})
  .then((res)=>{
    templateContainer.prepend(createCard(res, res.owner._id, clickCard, likeCard));
    closePopup(popupNewCard);
    formNewCard.reset();
  })
  .catch((err) => { 
    console.log(err);
  })
  .finally(() => {
    renderLoading(buttonSubmitAddCardForm, false);
  }); 

}


function submitProfileForm(evt) {

  evt.preventDefault(); 
  renderLoading(buttomSubmitEditProfileForm, true);

  requestAPI.setProfile({name: inputNameEditProfile.value, about: inputAboutEditProfile.value})
  .then((res) => {
    setProfile(res.name, res.about, res.avatar);
    closePopup(popupEditProfile);
    formEditProfile.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(buttomSubmitEditProfileForm, false);
  })

}

function submitAvatarForm(evt) {

  evt.preventDefault(); 
  renderLoading(profileAvatarSubmitButton, true);

  requestAPI.setAvatar({avatar: inputAvatar.value})
  .then((res) => {
    setProfile(res.name, res.about, res.avatar);
    closePopup(popupEditAvatar);
    formEditAvatar.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(profileAvatarSubmitButton, false);
  })

};

// Popups open/close

function clickCard (name, link) {

  popupCardPicture.src = link;
  popupCardPicture.alt = name;
  popupCardContent.textContent = name;  

  openPopup(popupCard); 

}

popups.forEach((popup) => { 

  popup.classList.add('popup_is-animated');
  popup.querySelector('.popup__close').addEventListener('click', () => {closePopup(popup)}); 
  popup.addEventListener('mousedown', (evt) => {mousedownPopup(evt, popup)});

});

// Validation

enableValidation(validationConfig);

// Initial card & profile

Promise.all([requestAPI.getProfile(), requestAPI.getCards()])
.then(([user, cards]) => {
  setProfile(user.name, user.about, user.avatar);
  cards.forEach(async (card) => {
    templateContainer.append(createCard(card, user['_id'], clickCard, likeCard));
  })
})
.catch((err) => {
  console.log(err);
});
