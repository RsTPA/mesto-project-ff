export function createCard(cardData, userId, handleLikeClick, handleDeleteClick, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeCount = cardElement.querySelector('.card__like-count');
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;
  
    // Проверка лайка пользователя
    const isLiked = cardData.likes.some(like => like._id === userId);
    if (isLiked) {
      likeButton.classList.add('card__like-button_is-active');
    }
  
    // Проверка владельца карточки
    if (cardData.owner._id !== userId) {
      deleteButton.remove();
    }
  
    // Обработчики событий
    likeButton.addEventListener('click', () => handleLikeClick(cardData._id, likeButton, likeCount));
    deleteButton?.addEventListener('click', () => handleDeleteClick(cardData._id, cardElement));
    cardImage.addEventListener('click', () => openImagePopup(cardData));
  
    return cardElement;
  }
  
  export function handleLikeClick(cardId, likeButton, likeCount) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? 'DELETE' : 'PUT';
  
    likeCard(cardId, likeMethod)
      .then(data => {
        likeCount.textContent = data.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch(err => console.error(err));
  }