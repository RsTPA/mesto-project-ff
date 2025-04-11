import '../pages/index.css';
import { createCard } from './card.js';
import { openModal, closeModal, handleOverlayClick } from './modal.js';
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

// DOM элементы
const profileSection = document.querySelector('.profile');
const profileNameElement = profileSection.querySelector('.profile__title');
const profileJobElement = profileSection.querySelector('.profile__description');
const profileAvatarElement = profileSection.querySelector('.profile__image');
const cardsContainer = document.querySelector('.places__list');

// Кнопки
const editProfileButton = profileSection.querySelector('.profile__edit-button');
const addCardButton = profileSection.querySelector('.profile__add-button');
const editAvatarButton = profileSection.querySelector('.profile__image-edit-button');

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
const avatarLinkInput = avatarForm.querySelector('.popup__input_type_url');

// Конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Переменные состояния
let currentUserId = null;

// Функция рендеринга карточки
function renderCard(cardData, container, method = 'append') {
  const cardElement = createCard(
    cardData,
    currentUserId,
    (cardId, element) => { // Обработчик удаления
      deleteCardApi(cardId)
        .then(() => element.remove())
        .catch(err => console.error('Ошибка удаления карточки:', err));
    },
    (cardId, isLiked, likeCounter) => { // Обработчик лайка
      const likeMethod = isLiked ? unlikeCard : likeCard;
      likeMethod(cardId)
        .then(updatedCard => {
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch(err => console.error('Ошибка лайка:', err));
    },
    (cardData) => { // Обработчик клика по изображению
      const imageElement = imagePreviewModal.querySelector('.popup__image');
      const captionElement = imagePreviewModal.querySelector('.popup__caption');
      
      imageElement.src = cardData.link;
      imageElement.alt = cardData.name;
      captionElement.textContent = cardData.name;
      
      openModal(imagePreviewModal);
    }
  );
  container[method](cardElement);
}

// Обработчики форм
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  
  submitButton.textContent = 'Сохранение...';
  
  updateProfileInfo(profileNameInput.value, profileJobInput.value)
    .then(userData => {
      profileNameElement.textContent = userData.name;
      profileJobElement.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(err => console.error('Ошибка обновления профиля:', err))
    .finally(() => {
      submitButton.textContent = initialText;
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  
  submitButton.textContent = 'Создание...';
  
  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then(newCard => {
      renderCard(newCard, cardsContainer, 'prepend');
      cardForm.reset();
      closeModal(addCardModal);
      clearValidation(cardForm, validationConfig);
    })
    .catch(err => console.error('Ошибка добавления карточки:', err))
    .finally(() => {
      submitButton.textContent = initialText;
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  
  submitButton.textContent = 'Сохранение...';
  
  updateAvatar(avatarLinkInput.value)
    .then(userData => {
      profileAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
      avatarForm.reset();
      closeModal(editAvatarModal);
    })
    .catch(err => console.error('Ошибка обновления аватара:', err))
    .finally(() => {
      submitButton.textContent = initialText;
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
  // Открытие модалок
  editProfileButton.addEventListener('click', () => {
    profileNameInput.value = profileNameElement.textContent;
    profileJobInput.value = profileJobElement.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(editProfileModal);
  });

  addCardButton.addEventListener('click', () => {
    cardForm.reset();
    clearValidation(cardForm, validationConfig);
    openModal(addCardModal);
  });

  editAvatarButton.addEventListener('click', () => {
    avatarForm.reset();
    clearValidation(avatarForm, validationConfig);
    openModal(editAvatarModal);
  });

  // Закрытие модалок
  document.querySelectorAll('.popup__close').forEach(button => {
    button.addEventListener('click', () => closeModal(button.closest('.popup')));
  });

  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', handleOverlayClick);
  });

  // Отправка форм
  profileForm.addEventListener('submit', handleProfileFormSubmit);
  cardForm.addEventListener('submit', handleCardFormSubmit);
  avatarForm.addEventListener('submit', handleAvatarFormSubmit);
}

// Инициализация приложения
function init() {
  enableValidation(validationConfig);
  setupEventListeners();

  Promise.all([getProfileInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      currentUserId = userData._id;
      profileNameElement.textContent = userData.name;
      profileJobElement.textContent = userData.about;
      profileAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
      
      cards.forEach(card => renderCard(card, cardsContainer));
    })
    .catch(err => console.error('Ошибка загрузки данных:', err));
}

init();