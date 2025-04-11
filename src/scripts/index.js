import '../pages/index.css';
import { deleteCard, createCard, handleLikeButton } from './card.js';
import { openModal, closeModal } from './modal.js';
import { initialCards } from './cards.js';

// DOM элементы
const cardsContainer = document.querySelector('.places__list');
const profileSection = document.querySelector('.profile');
const profileNameElement = profileSection.querySelector('.profile__title');
const profileJobElement = profileSection.querySelector('.profile__description');

// Кнопки
const editProfileButton = profileSection.querySelector('.profile__edit-button');
const addCardButton = profileSection.querySelector('.profile__add-button');

// Модальные окна
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imagePreviewModal = document.querySelector('.popup_type_image');

// Элементы модальных окон
const modalImageElement = imagePreviewModal.querySelector('.popup__image');
const modalCaptionElement = imagePreviewModal.querySelector('.popup__caption');

// Формы
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];

// Поля форм
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_description');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardForm.querySelector('.popup__input_type_url');


// Инициализация карточек
function renderInitialCards() {
    initialCards.forEach(card => {
        const newCard = createCard(card, deleteCard, handleLikeButton, handleImageClick);
        cardsContainer.append(newCard);
    });
}

// Обработчики событий
function handleImageClick(cardData) {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalCaptionElement.textContent = cardData.name;
    openModal(imagePreviewModal);
}

function handleFormEditProfileSubmit(evt) {
    evt.preventDefault();
    profileNameElement.textContent = profileNameInput.value;
    profileJobElement.textContent = profileJobInput.value;
    closeModal(editProfileModal);
}

function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard(
        { name: cardNameInput.value, link: cardLinkInput.value },
        deleteCard,
        handleLikeButton,
        handleImageClick
    );
    cardsContainer.prepend(newCard);
    cardForm.reset();
    closeModal(addCardModal);
}

function setupEventListeners() {
    // Открытие модальных окон
    editProfileButton.addEventListener('click', () => {
        profileNameInput.value = profileNameElement.textContent;
        profileJobInput.value = profileJobElement.textContent;
        openModal(editProfileModal);
    });

    addCardButton.addEventListener('click', () => openModal(addCardModal));

    // Обработчики кнопок закрытия
    document.querySelectorAll('.popup__close').forEach(closeButton => {
        const popup = closeButton.closest('.popup');
        closeButton.addEventListener('click', () => closeModal(popup));
    });

    // Отправка форм
    profileForm.addEventListener('submit', handleFormEditProfileSubmit);
    cardForm.addEventListener('submit', handleFormNewPlaceSubmit);
}

// Загрузка данных при запуске
function loadInitialData() {
    Promise.all([getUserInfo(), getInitialCards()])
      .then(([userData, cards]) => {
        updateProfileInfo(userData);
        renderInitialCards(cards, userData._id);
      })
      .catch(console.error);
  }
  
  // Обновление профиля
  function updateProfileInfo(userData) {
    profileNameElement.textContent = userData.name;
    profileJobElement.textContent = userData.about;
    profileAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
  }

// Инициализация приложения
function init() {
    renderInitialCards();
    setupEventListeners();
}

init();

// Валидация
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
  
  // Инициализация валидации
  enableValidation(validationConfig);
