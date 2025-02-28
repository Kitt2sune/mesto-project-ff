import {cardTemplate, tamplateContainer} from '../scripts/index';

// Функция создания карточки

function cardCreate(element, cardDelete, cardClick, cardLike) {
    
  const copyTemplate = cardTemplate.querySelector('.places__item').cloneNode(true); 
  const cardName = element.name;
  const cardLink = element.link;
  
  copyTemplate.querySelector('.card__image').src = cardLink;
  copyTemplate.querySelector('.card__image').alt = cardName;
  copyTemplate.querySelector('.card__title').textContent = cardName; 
  copyTemplate.querySelector('.card__delete-button').addEventListener('click', function() {cardDelete(copyTemplate)});
  copyTemplate.querySelector('.card__image').addEventListener('click', function() {cardClick({name: cardName, link: cardLink})});
  copyTemplate.querySelector('.card__like-button').addEventListener('click', function() {cardLike(copyTemplate)});
 
  return copyTemplate;

}

// Функция лайка карточек

function cardLike(copyTemplate) {

  copyTemplate.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');

}

// Функция добавления карточки на страницу

function cardAdd(card) {

  tamplateContainer.append(card);

}

// Функция удаления карточки

function cardDelete(copyTemplate) {

  copyTemplate.remove();

}

export {cardCreate, cardAdd, cardLike, cardDelete};