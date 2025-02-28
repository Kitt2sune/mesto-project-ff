// импорт стилей и карточек

import '../pages/index.css'; 
import {popupOpen, popupClose} from '../components/modal.js';
import {initialCards} from '../components/cards.js';
import {cardCreate, cardAdd, cardLike, cardDelete} from '../components/card.js'

// Дом-узлы темплейта

const cardTemplate = document.querySelector('#card-template').content;
const tamplateContainer = document.querySelector('.places__list');

// Дом-узлы попапов

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCard = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');


// Дом-узлы кнопок

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');

// Дом-узлы форм

const profileInfo = document.querySelector('.profile__info');
const profileNameInfo = profileInfo.querySelector('.profile__title');
const profileJobInfo = profileInfo.querySelector('.profile__description');

const formProfile = document.forms['edit-profile'];
const inputName = formProfile['name'];
const inputJob = formProfile['description'];

const formAdd = document.forms['new-place'];
const inputtitle = formAdd['place-name'];
const inputLink = formAdd['link'];

// Обработчик добавления новой карточки

formAdd.addEventListener('submit', (evt) => addCardFormSubmit(evt));

// Обработчик добавления новой карточки

buttonNewCard.addEventListener('click', function() { popupOpen(popupNewCard) });

// Обработчики формы редактирования профиля

buttonEdit.addEventListener('click', () => { 

  inputJob.value = profileJobInfo.textContent;
  inputName.value = profileNameInfo.textContent;
  popupOpen(popupEditProfile);

});

formProfile.addEventListener('submit', (evt) => handleFormSubmit(evt));

// Добавление ккарточек

initialCards.forEach(element => {cardAdd(cardCreate(element, cardDelete, cardClick, cardLike));});

// Функция добавления новой карточки

function addCardFormSubmit(evt) {

  evt.preventDefault(); 
  cardAdd(cardCreate({name: inputtitle.value, link: inputLink.value}, cardDelete, cardClick, cardLike));
  popupClose(popupNewCard);
  formAdd.reset();

}

// Функция изменения профиля

function handleFormSubmit(evt) {

    evt.preventDefault(); 
    
    document.querySelector('.profile__description').textContent = inputJob.value; 
    document.querySelector('.profile__title').textContent = inputName.value;
   
    popupClose(popupEditProfile);

}

// Функция открытие попапа карточки

function cardClick ({name, link}) {

    const cardPicture = document.querySelector('.popup__image');
    const cardContent = document.querySelector('.popup__caption');

    cardPicture.src = link;
    cardPicture.alt = name;
    cardContent.textContent = name;  

    popupOpen(popupCard); 

}

// Модуль закрытия попапов

popups.forEach((popup) => { 

    const buttonClose = popup.querySelector('.popup__close'); 

    buttonClose.addEventListener('click', () => popupClose(popup)); 
   
    popup.addEventListener('mousedown', (evt) => { 
      if (evt.target === evt.currentTarget) { 
        popupClose(popup); 
      } 
    });
    document.addEventListener('keydown', (evt) => { 
      if (evt.key === 'Escape') {
        popupClose(popup); 
      }
    }); 

});

export {cardTemplate, tamplateContainer};