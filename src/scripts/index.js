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

// Обработчик открытия изображения
function openImagePopup(cardData) {
  const popupImage = imagePreviewModal.querySelector('.popup__image');
  const popupCaption = imagePreviewModal.querySelector('.popup__caption');
  
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  
  openModal(imagePreviewModal);
}

// Обработчик лайка карточки
function handleLikeCard(cardId, isLiked, likeCounter, likeButton) {
  const likeMethod = isLiked ? unlikeCard : likeCard;
  likeMethod(cardId)
    .then(updatedCard => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.error('Ошибка при изменении лайка:', err));
}

// Обработчик удаления карточки
function handleDeleteCard(cardId, cardElement) {
  deleteCardApi(cardId)
    .then(() => cardElement.remove())
    .catch(err => console.error('Ошибка при удалении карточки:', err));
}

// Рендеринг карточки
function renderCard(cardData, container, method = RENDER_METHODS.APPEND) {
  const cardElement = createCard(
    cardData,
    currentUserId,
    handleDeleteCard,
    handleLikeCard,
    openImagePopup
  );
  
  container[method](cardElement);
}

// Обработчики форм
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  
  submitButton.textContent = 'Сохранение...';
  
  updateProfileInfo(profileNameInput.value, profileJobInput.value)
    .then(userData => {
      profileNameElement.textContent = userData.name;
      profileJobElement.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(err => {
      console.error('Ошибка обновления профиля:', err);
      alert('Не удалось обновить профиль');
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  
  submitButton.textContent = 'Создание...';
  
  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then(newCard => {
      renderCard(newCard, cardsContainer, RENDER_METHODS.PREPEND);
      cardForm.reset();
      closeModal(addCardModal);
      clearValidation(cardForm, VALIDATION_CONFIG);
    })
    .catch(err => {
      console.error('Ошибка добавления карточки:', err);
      alert('Не удалось добавить карточку');
    })
    .finally(() => {
      submitButton.textContent = 'Создать';
    });
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  
  submitButton.textContent = 'Сохранение...';
  
  updateAvatar(avatarLinkInput.value)
    .then(userData => {
      profileAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
      avatarForm.reset();
      closeModal(editAvatarModal);
    })
    .catch(err => {
      console.error('Ошибка обновления аватара:', err);
      alert('Не удалось обновить аватар');
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

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
    .catch(err => {
      console.error('Ошибка загрузки данных:', err);
      alert('Не удалось загрузить данные');
    });
}

init();