// @todo: Темплейт карточки 

const cardTamplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const tamplateContainer = document.querySelector('.places__list');
const cardsList = [];

// @todo: Функция создания карточки

function createCards(name, link) {
    
    const copyTemplate = cardTamplate.querySelector('.places__item').cloneNode(true); 
    copyTemplate.querySelector('.card__image').src = link;       
    copyTemplate.querySelector('.card__title').textContent = name;

    // @todo: Функция удаления карточки
    copyTemplate.querySelector('.card__delete-button').addEventListener('click', function() { copyTemplate.remove(); } ); 

    tamplateContainer.append(copyTemplate);
}

// @todo: Вывести карточки на страницу
for (let i = 0; i < 6; i++) { 
    cardsList[i] = createCards(initialCards[i].name, initialCards[i].link, i);
}
