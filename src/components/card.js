import { putLike, deleteLike } from './api.js';

export function createCard({ card, handleDeleteCard, handleLike, handleImageClick, currentUserId }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const resetButton = cardElement.querySelector('.card__delete-button');
  const likeCountElement = cardElement.querySelector('.card__like-count');

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  likeCountElement.textContent = card.likes.length;

  if (card.likes.some(like => like._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (card.owner._id !== currentUserId) {
    resetButton.style.display = 'none';
  } else {
    resetButton.addEventListener('click', () => handleDeleteCard(cardElement, card._id));
  }

  likeButton.addEventListener('click', () => handleLike(likeButton, card, likeCountElement));
  cardImage.addEventListener('click', () => handleImageClick(card));

  return cardElement;
}

export function handleLike(likeButton, card, likeCountElement) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeMethod = isLiked ? deleteLike : putLike;

  likeMethod(card._id)
    .then(updatedCard => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch(console.error);
}

export function deleteCard(cardElement) {
  cardElement.remove();
}