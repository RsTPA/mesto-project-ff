import '../pages/index.css';
import { Api } from './api.js';
import { openPopup, closePopup, closeByOverlay } from './modal.js';
import { createCard } from './card.js';
import { enableValidation } from './validate.js';
import { handleSubmit } from './utils.js';
import { config, validationSettings } from './constants.js';

const api = new Api(config);

// DOM элементы
const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_avatar');

// Формы
const editForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];
const avatarForm = document.forms['edit-avatar'];

let userId;

// Загрузка начальных данных
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    setProfileInfo(userData);
    renderCards(cards);
  })
  .catch(err => console.log(err));

// Обработчики
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  fillProfileForm();
});

addButton.addEventListener('click', () => openPopup(popupNewCard));
avatarEditButton.addEventListener('click', () => openPopup(popupAvatar));

// Закрытие попапов
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('mousedown', closeByOverlay);
  popup.querySelector('.popup__close').addEventListener('click', () => closePopup(popup));
});

// Обработчики форм
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleSubmit(
    () => api.editProfile({
      name: editForm.elements.name.value,
      about: editForm.elements.about.value
    }),
    popupEdit
  );
});

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleSubmit(
    () => api.addNewCard({
      name: newCardForm.elements.name.value,
      link: newCardForm.elements.link.value
    }).then(card => {
      placesList.prepend(createCard(card, handleDeleteCard, handleLikeCard, userId));
      newCardForm.reset();
    }),
    popupNewCard
  );
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleSubmit(
    () => api.updateAvatar({
      avatar: avatarForm.elements.avatar.value
    }).then(userData => {
      document.querySelector('.profile__avatar').src = userData.avatar;
      avatarForm.reset();
    }),
    popupAvatar
  );
});

// Функции
function setProfileInfo({ name, about, avatar }) {
  document.querySelector('.profile__title').textContent = name;
  document.querySelector('.profile__description').textContent = about;
  document.querySelector('.profile__avatar').src = avatar;
}

function fillProfileForm() {
  const name = document.querySelector('.profile__title').textContent;
  const about = document.querySelector('.profile__description').textContent;
  
  editForm.elements.name.value = name;
  editForm.elements.about.value = about;
}

function renderCards(cards) {
  cards.forEach(cardData => {
    placesList.append(createCard(cardData, handleDeleteCard, handleLikeCard, userId));
  });
}

function handleDeleteCard(cardId, cardElement) {
  api.deleteCard(cardId)
    .then(() => cardElement.remove())
    .catch(err => console.log(err));
}

function handleLikeCard(cardId, likeButton, likeCountElement) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
  api.toggleLike(cardId, isLiked)
    .then(data => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCountElement.textContent = data.likes.length;
    })
    .catch(err => console.log(err));
}

// Валидация форм
enableValidation(validationSettings);