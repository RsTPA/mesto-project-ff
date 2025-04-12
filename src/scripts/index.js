import '../pages/index.css';
import { createCard } from './card.js';
import { openModal, closeModal, setupModalCloseListeners } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  getProfileInfo,
  getInitialCards,
  updateProfileInfo,
  updateAvatar,
  addNewCard,
  deleteCard as deleteCardApi,
  likeCard,
  unlikeCard
} from './api.js';

import { 
  ERROR_MESSAGES, 
  DEFAULT_BUTTON_TEXTS, 
  VALIDATION_CONFIG, 
  RENDER_METHODS 
} from './constants.js';


// DOM элементы
const profileSection = document.querySelector('.profile');
const profileNameElement = profileSection.querySelector('.profile__name');
const profileJobElement = profileSection.querySelector('.profile__description');
const profileAvatarElement = profileSection.querySelector('.profile__avatar');
const cardsContainer = document.querySelector('.places__list');

// Кнопки
const editProfileButton = profileSection.querySelector('.profile__edit-button');
const addCardButton = profileSection.querySelector('.profile__add-button');
const editAvatarButton = profileSection.querySelector('.profile__avatar-edit');

// Модальные окна
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const editAvatarModal = document.querySelector('.popup_type_edit-avatar');
const imagePreviewModal = document.querySelector('.popup_type_image');

// Формы
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const avatarForm = document.forms['edit-avatar'];

// Поля форм
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_description');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardForm.querySelector('.popup__input_type_url');
const avatarLinkInput = avatarForm.querySelector('.popup__input_type_avatar-url');

// Переменные состояния
let currentUserId = null;

// Универсальная функция изменения состояния кнопки
function setButtonState(button, isLoading, text = '') {
  button.textContent = isLoading ? DEFAULT_BUTTON_TEXTS.LOADING : text;
  button.disabled = isLoading;
}

// Обработчик ошибок API
function handleApiError(error, defaultMessage) {
  console.error(defaultMessage, error);
  alert(defaultMessage);
}

// Обработчик удаления карточки
function handleDeleteCard(cardId, cardElement) {
  return deleteCardApi(cardId)
    .then(() => cardElement.remove())
    .catch(err => handleApiError(err, ERROR_MESSAGES.CARD_DELETE));
}

// Обработчик лайка карточки
function handleLikeCard(cardId, isLiked, likeCounter) {
  const likeMethod = isLiked ? unlikeCard : likeCard;
  return likeMethod(cardId)
    .then(updatedCard => {
      likeCounter.textContent = updatedCard.likes.length;
      return updatedCard;
    })
    .catch(err => handleApiError(err, ERROR_MESSAGES.LIKE));
}

// Обработчик открытия изображения
function openImagePopup(cardData) {
  const imageElement = imagePreviewModal.querySelector('.popup__image');
  const captionElement = imagePreviewModal.querySelector('.popup__caption');
  
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  captionElement.textContent = cardData.name;
  
  openModal(imagePreviewModal);
}

// Рендеринг карточки
function renderCard(cardData, container, method = RENDER_METHODS.APPEND) {
  const cardElement = createCard(
    cardData,
    currentUserId,
    (cardId, element) => handleDeleteCard(cardId, element),
    (cardId, isLiked, likeCounter) => handleLikeCard(cardId, isLiked, likeCounter),
    (data) => openImagePopup(data)
  );
  
  container[method](cardElement);
}

// Обработчики форм
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  
  setButtonState(submitButton, true);
  
  updateProfileInfo(profileNameInput.value, profileJobInput.value)
    .then(userData => {
      profileNameElement.textContent = userData.name;
      profileJobElement.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(err => handleApiError(err, ERROR_MESSAGES.PROFILE_UPDATE))
    .finally(() => setButtonState(submitButton, false, DEFAULT_BUTTON_TEXTS.SAVE));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  
  setButtonState(submitButton, true, DEFAULT_BUTTON_TEXTS.CREATE);
  
  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then(newCard => {
      renderCard(newCard, cardsContainer, RENDER_METHODS.PREPEND);
      cardForm.reset();
      closeModal(addCardModal);
      clearValidation(cardForm, VALIDATION_CONFIG);
    })
    .catch(err => handleApiError(err, ERROR_MESSAGES.CARD_ADD))
    .finally(() => setButtonState(submitButton, false, DEFAULT_BUTTON_TEXTS.CREATE));
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  
  setButtonState(submitButton, true);
  
  updateAvatar(avatarLinkInput.value)
    .then(userData => {
      profileAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
      avatarForm.reset();
      closeModal(editAvatarModal);
    })
    .catch(err => handleApiError(err, ERROR_MESSAGES.AVATAR_UPDATE))
    .finally(() => setButtonState(submitButton, false, DEFAULT_BUTTON_TEXTS.SAVE));
}

// Настройка обработчиков событий
function setupEventListeners() {
  // Открытие модалок
  editProfileButton.addEventListener('click', () => {
    profileNameInput.value = profileNameElement.textContent;
    profileJobInput.value = profileJobElement.textContent;
    clearValidation(profileForm, VALIDATION_CONFIG);
    openModal(editProfileModal);
  });

  addCardButton.addEventListener('click', () => {
    cardForm.reset();
    clearValidation(cardForm, VALIDATION_CONFIG);
    openModal(addCardModal);
  });

  editAvatarButton.addEventListener('click', () => {
    avatarForm.reset();
    clearValidation(avatarForm, VALIDATION_CONFIG);
    openModal(editAvatarModal);
  });

  // Настройка закрытия модалок
  setupModalCloseListeners();
}

// Инициализация приложения
function init() {
  enableValidation(VALIDATION_CONFIG);
  setupEventListeners();

  // Назначение обработчиков форм
  profileForm.addEventListener('submit', handleProfileFormSubmit);
  cardForm.addEventListener('submit', handleCardFormSubmit);
  avatarForm.addEventListener('submit', handleAvatarFormSubmit);

  // Загрузка начальных данных
  Promise.all([getProfileInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      currentUserId = userData._id;
      profileNameElement.textContent = userData.name;
      profileJobElement.textContent = userData.about;
      profileAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
      
      cards.forEach(card => {
        renderCard(card, cardsContainer);
      });
    })
    .catch(err => handleApiError(err, ERROR_MESSAGES.SERVER_ERROR));
}

init();