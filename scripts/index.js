// @todo: Функция создания карточки

function createCard(cardData, deleteCallback) {
    // Клонируем шаблон карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // Устанавливаем значения вложенных элементов
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Добавляем обработчик клика на иконку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');

initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
});

