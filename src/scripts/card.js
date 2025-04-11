export function createCard(cardData, userId, handleDeleteCard, handleLikeCard, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-count');
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCounter.textContent = cardData.likes.length;
  
    // Показываем кнопку удаления только для своих карточек
    if (cardData.owner._id !== userId) {
      deleteButton.remove();
    } else {
      deleteButton.addEventListener('click', () => handleDeleteCard(cardData._id, cardElement));
    }
  
    // Проверяем, лайкнул ли текущий пользователь карточку
    const isLiked = cardData.likes.some(like => like._id === userId);
    if (isLiked) {
      likeButton.classList.add('card__like-button_is-active');
    }
  
    likeButton.addEventListener('click', () => {
      handleLikeCard(cardData._id, isLiked, likeCounter);
    });
  
    cardImage.addEventListener('click', () => handleImageClick(cardData));
  
    return cardElement;
  }
  
  export function toggleLike(cardId, isLiked, likeCounter) {
    return isLiked ? unlikeCard(cardId) : likeCard(cardId);
  }