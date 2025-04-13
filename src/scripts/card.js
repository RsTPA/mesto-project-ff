import { openPopup } from './modal.js';

export function createCard(cardData, handleDeleteClick, handleLikeClick, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }

  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  deleteButton.addEventListener('click', () => handleDeleteClick(cardData._id, cardElement));
  likeButton.addEventListener('click', () => handleLikeClick(cardData._id, likeButton, likeCount));
  cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

  return cardElement;
}

function openImagePopup(link, name) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');

  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;

  openPopup(popupImage);
}