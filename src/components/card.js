import {cardTemplate, tamplateContainer} from '../scripts/index';

// Функция создания карточки

function createCard(element, deleteCard, clickCard, likeCard) {
    
  const copyTemplate = cardTemplate.querySelector('.places__item').cloneNode(true); 
  const cardName = element.name;
  const cardLink = element.link;
  
  copyTemplate.querySelector('.card__image').src = cardLink;
  copyTemplate.querySelector('.card__image').alt = cardName;
  copyTemplate.querySelector('.card__title').textContent = cardName; 
  copyTemplate.querySelector('.card__delete-button').addEventListener('click', () => {deleteCard(copyTemplate)});
  copyTemplate.querySelector('.card__image').addEventListener('click', () => {clickCard({name: cardName, link: cardLink})});
  copyTemplate.querySelector('.card__like-button').addEventListener('click', () => {likeCard(copyTemplate)});
 
  return copyTemplate;

}

// Функция добавления карточки на страницу

function addCard(card) {

  tamplateContainer.prepend(card);

}

// Функция лайка карточек

function likeCard(copyTemplate) {

  copyTemplate.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');

}

// Функция удаления карточки

function deleteCard(copyTemplate) {

  copyTemplate.remove();

}

export {createCard, addCard, likeCard, deleteCard};