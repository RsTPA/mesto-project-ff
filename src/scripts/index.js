import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getCards, getUserInfo, updateProfile, updateAvatar, addCard, deleteCard, likeCard } from './api.js';
import { createCard, handleLikeClick } from './card.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId;

// DOM элементы
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const editForm = document.querySelector('.popup__form_type_edit');
const addForm = document.querySelector('.popup__form_type_add');
const avatarForm = document.querySelector('.popup__form_type_avatar');
const cardsContainer = document.querySelector('.places__list');

// Функции
function renderCards(cards) {
  cards.forEach(card => {
    const cardElement = createCard(card, userId, handleLikeClick, handleDeleteClick, openImagePopup);
    cardsContainer.append(cardElement);
  });
}

function handleDeleteClick(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => cardElement.remove())
    .catch(err => console.error(err));
}

function openImagePopup(cardData) {
  const imagePopup = document.querySelector('.popup_type_image');
  imagePopup.querySelector('.popup__image').src = cardData.link;
  imagePopup.querySelector('.popup__image').alt = cardData.name;
  imagePopup.querySelector('.popup__caption').textContent = cardData.name;
  openModal(imagePopup);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  
  updateProfile({
    name: nameInput.value,
    about: jobInput.value
  })
    .then(data => {
      document.querySelector('.profile__title').textContent = data.name;
      document.querySelector('.profile__description').textContent = data.about;
      closeModal(evt.target.closest('.popup'));
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Создание...';
  
  addCard({
    name: evt.target.elements['place-name'].value,
    link: evt.target.elements.link.value
  })
    .then(card => {
      const cardElement = createCard(card, userId, handleLikeClick, handleDeleteClick, openImagePopup);
      cardsContainer.prepend(cardElement);
      evt.target.reset();
      closeModal(evt.target.closest('.popup'));
    })
    .finally(() => {
      submitButton.textContent = 'Создать';
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  
  updateAvatar(evt.target.elements.link.value)
    .then(data => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
      closeModal(evt.target.closest('.popup'));
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
}

// Инициализация
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    document.querySelector('.profile__title').textContent = userData.name;
    document.querySelector('.profile__description').textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
    renderCards(cards);
  })
  .catch(err => console.error(err));

// Обработчики событий
editButton.addEventListener('click', () => {
  const popup = document.querySelector('.popup_type_edit');
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  clearValidation(editForm, config);
  openModal(popup);
});

addButton.addEventListener('click', () => {
  const popup = document.querySelector('.popup_type_add');
  clearValidation(addForm, config);
  openModal(popup);
});

avatarEditButton.addEventListener('click', () => {
  const popup = document.querySelector('.popup_type_avatar');
  clearValidation(avatarForm, config);
  openModal(popup);
});

editForm.addEventListener('submit', handleProfileSubmit);
addForm.addEventListener('submit', handleAddCardSubmit);
avatarForm.addEventListener('submit', handleAvatarSubmit);

// Активация валидации
enableValidation(config);