
import { requestAPI } from "./api";
import { toggleConfirmPopup } from "../scripts";

let currentButton;
let currentCardId;

function createCard(card = {}, userId, clickCard, likeCard) {
  
  const template = document.querySelector('#card-template').content;
  const copyTemplate = template.querySelector('.places__item').cloneNode(true); 
  const image = copyTemplate.querySelector('.card__image');
  const likeButton = copyTemplate.querySelector('.card__like-block_button');
  const counter = copyTemplate.querySelector('.card__like-block_counter');
  const deleteButton = copyTemplate.querySelector('.card__delete-button');
  const name = card.name;
  const link = card.link;

  image.src = link;
  image.alt = name;
  copyTemplate.querySelector('.card__title').textContent = name; 

  if (card.likes.find((like) => {like === card.owner['_id']})) {
    likeButton.classList.toggle('card__like-block_button_is-active');
  }

  if (userId === card.owner._id) {
    activeDeleteButton(deleteButton, card._id);
  }

  counter.textContent = card.likes.length;

  image.addEventListener('click', () => {clickCard(name, link)});

  likeButton.addEventListener('click', () => {likeCard(likeButton, counter, card._id)});
 
  return copyTemplate;

};

function updateCounter(likeButton, counter, likes) {

  counter.textContent = likes.length;

  if (likeButton.classList.contains('card__like-block_button_is-active')) {
    likeButton.classList.remove('card__like-block_button_is-active');
  } else {
    likeButton.classList.add('card__like-block_button_is-active');
  }

};

// Функция лайка карточек

function likeCard(likeButton, counter, cardId) {

  const likeCardButton = likeButton.classList.contains('card__like-block_button_is-active')
  ? requestAPI.deleteLike(cardId): requestAPI.likeCard(cardId);

  likeCardButton.then((res) => {
    updateCounter(likeButton, counter, res.likes);
  })
  .catch((err) => console.log(err))

};

// Функция удаления карточки

function deleteCard(evt) {
  
  evt.preventDefault();

  requestAPI.deleteCard(currentCardId)
  .then(() => {
    currentButton.closest('.places__item').remove();
    toggleConfirmPopup(false);
  })
  .catch((err) => console.log(err));

};

function activeDeleteButton(deleteButton, cardId) {
  deleteButton.style.display = ('block')
  deleteButton.addEventListener('click', () => {
    toggleConfirmPopup(true);
    currentCardId = cardId;
    currentButton = deleteButton;
  });
};

export {createCard, likeCard, deleteCard};