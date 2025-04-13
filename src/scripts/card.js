export function createCard(cardData, userId, handlers) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCountElement = cardElement.querySelector('.card__like-count');

  // Заполнение данных карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCountElement.textContent = cardData.likes.length;

  // Проверка лайков
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_active');
  }

  // Проверка владельца карточки
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }

  // Обработчики событий
  likeButton.addEventListener('click', () => {
    handlers.handleLikeClick()
      .catch(err => console.error('Ошибка при обработке лайка:', err));
  });

  if (deleteButton) {
    deleteButton.addEventListener('click', () => {
      handlers.handleDeleteClick()
        .catch(err => console.error('Ошибка при удалении карточки:', err));
    });
  }

  cardImage.addEventListener('click', () => {
    handlers.handleCardClick();
  });

  // Методы карточки
  cardElement.updateLikes = (likes) => {
    likeCountElement.textContent = likes.length;
    likeButton.classList.toggle('card__like-button_active', 
      likes.some(like => like._id === userId));
  };

  cardElement.remove = () => {
    cardElement.remove();
  };

  return cardElement;
}