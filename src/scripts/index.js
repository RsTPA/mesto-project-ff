import '../pages/index.css';
import { deleteCard, createCard, handleLikeButton } from './card.js';
import { openModal, closeModal } from './modal.js';  // Убраны алиасы
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
    openModal(imagePreviewModal);  // Использовано прямое имя функции
}

function handleFormEditProfileSubmit(evt) {
    evt.preventDefault();
    profileNameElement.textContent = profileNameInput.value;
    profileJobElement.textContent = profileJobInput.value;
    closeModal(editProfileModal);  // Использовано прямое имя функции
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
    closeModal(addCardModal);  // Использовано прямое имя функции
}

function setupEventListeners() {
    // Открытие модальных окон
    editProfileButton.addEventListener('click', () => {
        profileNameInput.value = profileNameElement.textContent;
        profileJobInput.value = profileJobElement.textContent;
        openModal(editProfileModal);  // Использовано прямое имя функции
    });

    addCardButton.addEventListener('click', () => openModal(addCardModal));  // Использовано прямое имя функции

    // Упрощенный обработчик закрытия модальных окон
    document.querySelectorAll('.popup').forEach(popup => {
        const closeButton = popup.querySelector('.popup__close');
        closeButton.addEventListener('click', () => closeModal(popup));
        
        popup.addEventListener('click', (evt) => {
            if (evt.target === popup) {
                closeModal(popup);
            }
        });
    });

    // Отправка форм
    profileForm.addEventListener('submit', handleFormEditProfileSubmit);
    cardForm.addEventListener('submit', handleFormNewPlaceSubmit);
}

// Инициализация приложения
function init() {
    renderInitialCards();
    setupEventListeners();
}

init();