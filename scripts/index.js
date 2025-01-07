// @todo: Темплейт карточки 

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const tamplateContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCards(element, deleteCards) {
    
    const copyTemplate = cardTemplate.querySelector('.places__item').cloneNode(true); 
    const cardName = element.name;
    copyTemplate.querySelector('.card__image').src = element.link;       
    copyTemplate.querySelector('.card__image').alt = cardName;
    copyTemplate.querySelector('.card__title').textContent = cardName;
    copyTemplate.querySelector('.card__delete-button').addEventListener('click', function() { deleteCards(copyTemplate) });
    return copyTemplate;

}

// @todo: Вывести карточки на страницу

function addCards(card) {

    tamplateContainer.append(card);

}

// @todo: Функция удаления карточки

function deleteCards(copyTemplate) {

    copyTemplate.remove();

}

initialCards.forEach(element => {

    addCards(createCards(element, deleteCards));

});
