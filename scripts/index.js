// @todo: Темплейт карточки 

const cardTamplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const tamplateContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCards(element, deleteCards) {
    
    const copyTemplate = cardTamplate.querySelector('.places__item').cloneNode(true); 
    copyTemplate.querySelector('.card__image').src = element.link;       
    copyTemplate.querySelector('.card__image').alt = element.name;
    copyTemplate.querySelector('.card__title').textContent = element.name;
    deleteCards(copyTemplate);
    return copyTemplate;

}

// @todo: Вывести карточки на страницу

function addCards(card) {

    tamplateContainer.append(card);

}

// @todo: Функция удаления карточки

function deleteCards(copyTemplate) {

    copyTemplate.querySelector('.card__delete-button').addEventListener('click', function() { copyTemplate.remove() });

}

initialCards.forEach(element => {

    addCards(createCards(element, deleteCards));
    
});
