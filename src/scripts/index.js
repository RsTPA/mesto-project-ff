import '../pages/index.css';
import { createCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import api from './api.js';

// Конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// DOM элементы
const cardsContainer = document.querySelector('.places__list');
const profileSection = document.querySelector('.profile');
const profileNameElement = profileSection.querySelector('.profile__title');
const profileJobElement = profileSection.querySelector('.profile__description');
const profileAvatarElement = profileSection.querySelector('.profile__image');

// Кнопки
const editProfileButton = profileSection.querySelector('.profile__edit-button');
const addCardButton = profileSection.querySelector('.profile__add-button');
const editAvatarButton = profileSection.querySelector('.profile__image-edit-button');

// Модальные окна
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imagePreviewModal = document.querySelector('.popup_type_image');
const editAvatarModal = document.querySelector('.popup_type_edit-avatar');

// Элементы модальных окон
const modalImageElement = imagePreviewModal.querySelector('.popup__image');
const modalCaptionElement = imagePreviewModal.querySelector('.popup__caption');

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

let userId;

// Функция создания карточки
function createCardElement(cardData) {
  const card = createCard(
    cardData,
    userId,
    {
      handleCardClick: () => handleImageClick(cardData),
      handleLikeClick: () => {
        const likeMethod = cardData.likes.some(like => like._id === userId) 
          ? api.unlikeCard(cardData._id) 
          : api.likeCard(cardData._id);
        
        return likeMethod
          .then(updatedCard => {
            card.updateLikes(updatedCard.likes);
          });
      },
      handleDeleteClick: () => {
        return api.deleteCard(cardData._id)
          .then(() => {
            card.remove();
          });
      }
    }
  );
  
  return card;
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
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  api.editProfile({
    name: profileNameInput.value,
    about: profileJobInput.value
  })
  .then(data => {
    profileNameElement.textContent = data.name;
    profileJobElement.textContent = data.about;
    closeModal(editProfileModal);
  })
  .catch(err => console.error('Ошибка обновления профиля:', err))
  .finally(() => {
    submitButton.textContent = originalText;
  });
}

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Создание...';

  api.addNewCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  })
  .then(card => {
    const cardElement = createCardElement(card);
    cardsContainer.prepend(cardElement);
    closeModal(addCardModal);
    cardForm.reset();
  })
  .catch(err => console.error('Ошибка добавления карточки:', err))
  .finally(() => {
    submitButton.textContent = originalText;
  });
}

function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  api.updateAvatar({
    avatar: avatarLinkInput.value
  })
  .then(data => {
    profileAvatarElement.style.backgroundImage = `url(${data.avatar})`;
    closeModal(editAvatarModal);
    avatarForm.reset();
  })
  .catch(err => console.error('Ошибка обновления аватара:', err))
  .finally(() => {
    submitButton.textContent = originalText;
  });
}

function setupEventListeners() {
  // Открытие модальных окон
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

  // Обработчики кнопок закрытия
  document.querySelectorAll('.popup__close').forEach(closeButton => {
    const popup = closeButton.closest('.popup');
    closeButton.addEventListener('click', () => closeModal(popup));
  });

  // Отправка форм
  profileForm.addEventListener('submit', handleFormEditProfileSubmit);
  cardForm.addEventListener('submit', handleFormNewPlaceSubmit);
  avatarForm.addEventListener('submit', handleFormEditAvatarSubmit);
}

// Инициализация приложения
function init() {
  // Включение валидации
  enableValidation(validationConfig);

  // Загрузка данных пользователя и карточек
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      
      // Обновление профиля
      profileNameElement.textContent = userData.name;
      profileJobElement.textContent = userData.about;
      profileAvatarElement.style.backgroundImage = `url(${userData.avatar})`;

      // Отрисовка карточек
      cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardsContainer.append(cardElement);
      });
    })
    .catch(err => {
      console.error('Ошибка при загрузке данных:', err);
    });

  // Настройка обработчиков событий
  setupEventListeners();
}

init();