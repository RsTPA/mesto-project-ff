import { deleteCard, likeCard, unlikeCard } from './api.js';
import { openModal, closeModal } from './modal.js';

const confirmPopup = document.querySelector('.popup_type_confirm');
const confirmForm = confirmPopup.querySelector('.popup__form');

export function createCard(cardData, userId, handleDeleteClick, handleLikeClick, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-count');

  // Заполняем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  // Проверяем, лайкнул ли текущий пользователь карточку
  const isLiked = cardData.likes.some(like => like._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }

  // Навешиваем обработчики
  deleteButton.addEventListener('click', () => handleDeleteClick(cardData._id, cardElement));
  
  likeButton.addEventListener('click', () => {
    handleLikeClick(cardData._id, isLiked, likeCounter, likeButton);
  });

  cardImage.addEventListener('click', () => {
    if (typeof handleImageClick === 'function') {
      handleImageClick({
        name: cardData.name,
        link: cardData.link
      });
    }
  });
  

  return cardElement;
}

export function handleLike(cardId, isLiked, likeCounter, likeButton) {
  const likeMethod = isLiked ? unlikeCard : likeCard;
  
  likeMethod(cardId)
    .then(updatedCard => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.error('Ошибка при изменении лайка:', err));
}

export function handleDelete(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => cardElement.remove())
    .catch(err => console.error('Ошибка при удалении карточки:', err));
}

export function setupCardDelete(cardId, cardElement) {
  return confirmDelete(cardId, cardElement)
    .then(confirmed => {
      if (confirmed) {
        return handleDelete(cardId, cardElement);
      }
    });
}

function confirmDelete(cardId, cardElement) {
  return new Promise((resolve) => {
    const handleConfirm = (evt) => {
      evt.preventDefault();
      confirmForm.removeEventListener('submit', handleConfirm);
      resolve(true);
      closeModal(confirmPopup);
    };

    const handleCancel = () => {
      confirmForm.removeEventListener('submit', handleConfirm);
      resolve(false);
      closeModal(confirmPopup);
    };

    confirmForm.addEventListener('submit', handleConfirm);
    confirmPopup.querySelector('.popup__close').addEventListener('click', handleCancel);
    confirmPopup.addEventListener('mousedown', (evt) => {
      if (evt.target === confirmPopup) handleCancel();
    });

    openModal(confirmPopup);
  });
}