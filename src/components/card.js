// Функция создания карточки

function createCard(element, deleteCard, clickCard, likeCard) {
  
  const cardTemplate = document.querySelector('#card-template').content;
  const copyTemplate = cardTemplate.querySelector('.places__item').cloneNode(true); 
  const cardName = element.name;
  const cardLink = element.link;
  const cardLikeButton = copyTemplate.querySelector('.card__like-button')
  
  copyTemplate.querySelector('.card__image').src = cardLink;
  copyTemplate.querySelector('.card__image').alt = cardName;
  copyTemplate.querySelector('.card__title').textContent = cardName; 
  copyTemplate.querySelector('.card__delete-button').addEventListener('click', () => {deleteCard(copyTemplate)});
  copyTemplate.querySelector('.card__image').addEventListener('click', () => {clickCard({name: cardName, link: cardLink})});
  cardLikeButton.addEventListener('click', () => {likeCard(cardLikeButton)});
 
  return copyTemplate;

}

// Функция лайка карточек

function likeCard(cardLikeButton) {

  cardLikeButton.classList.toggle('card__like-button_is-active');

}

// Функция удаления карточки

function deleteCard(copyTemplate) {

  copyTemplate.remove();

}

export {createCard, likeCard, deleteCard};