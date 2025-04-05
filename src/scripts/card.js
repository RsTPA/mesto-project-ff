export function createCard(cardData, deleteCallback, handleLikeButton, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', handleLikeButton);

    cardImage.addEventListener('click', () => handleImageClick(cardData));

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    return cardElement;
}

export function deleteCard(cardElement) {
    cardElement.remove();
}

export function handleLikeButton(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}