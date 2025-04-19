import './pages/index.css';
import { createCard, deleteCard, handleLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, deleteCardFromApi, updateAvatar } from './components/api.js';
import { validationConfig } from './utils/constants.js';

// DOM элементы
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Попапы
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const deletePopup = document.querySelector('.popup_type_delete');
const avatarPopup = document.querySelector('.popup_type_change-avatar');

// Элементы попапов
const imageElement = imagePopup.querySelector('.popup__image');
const captionElement = imagePopup.querySelector('.popup__caption');

// Формы
const formEdit = document.forms['edit-profile'];
const newCardFormElement = document.forms['new-place'];
const avatarForm = document.forms['edit-avatar'];

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const confirmDeleteButton = deletePopup.querySelector('#confirm-delete');

// Инпуты
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');
const placeNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const linkInput = newCardFormElement.querySelector('.popup__input_type_url');
const avatarLinkInput = avatarForm.querySelector('#avatar-input');
const avatarInputError = avatarForm.querySelector('.avatar-input-error');

// Функция для вывода данных пользователя
function displayUserInfo(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
}

// Получаем данные пользователя и карточки
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    displayUserInfo(user);
    renderCards(cards, placesList, user._id);
  })
  .catch(console.error);

// Удаление карточки
function handleDeleteCard(cardElement, cardId) {
  openDeletePopup(cardElement, cardId, (id) => {
    deleteCardFromApi(id)
      .then(() => {
        deleteCard(cardElement);
        closePopup(deletePopup);
      })
      .catch(console.error);
  });
}

// Открытие попапа удаления карточки
function openDeletePopup(cardElement, cardId, handleConfirmDelete) {
  openPopup(deletePopup);
  confirmDeleteButton.onclick = () => {
    handleConfirmDelete(cardId);
  };
}

// Обработка клика по изображению
function handleImageClick(card) {
  imageElement.src = card.link;
  imageElement.alt = card.name;
  captionElement.textContent = card.name;
  openPopup(imagePopup);
}

// Вывод карточек на страницу
function renderCards(cards, container, currentUserId) {
  cards.forEach(card => {
    const cardElement = createCard({
      card: card,
      handleDeleteCard: handleDeleteCard,
      handleLike: handleLike,
      handleImageClick: handleImageClick,
      currentUserId: currentUserId
    });
    container.append(cardElement);
  });
}

// Обработчики событий для открытия попапов
editButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEdit, validationConfig);
});

addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
  clearValidation(newCardFormElement, validationConfig);
});

// Обработчик для смены аватара
profileImage.addEventListener('click', () => {
  openPopup(avatarPopup);
  clearValidation(avatarForm, validationConfig);
});

// Обработчик отправки формы смены аватара
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateAvatar(avatarLinkInput.value)
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarLinkInput.value})`;
      closePopup(avatarPopup);
      avatarForm.reset();
    })
    .catch(err => {
      avatarInputError.textContent = err;
      avatarInputError.classList.add('popup__error_visible');
    })
    .finally(() => {
      submitButton.textContent = initialText;
      submitButton.disabled = false;
    });
});

// Закрытие попапов на крестик
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});


// Закрытие попапов на оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateUserInfo(nameInput.value, jobInput.value)
    .then(updatedUser => {
      displayUserInfo(updatedUser);
      closePopup(editPopup);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = initialText;
      submitButton.disabled = false;
    });
}

formEdit.addEventListener('submit', handleProfileFormSubmit);

// Обработчик добавления новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  addCard(placeNameInput.value, linkInput.value)
    .then(cardData => {
      const cardElement = createCard({
        card: cardData,
        handleDeleteCard: handleDeleteCard,
        handleLike: handleLike,
        handleImageClick: handleImageClick,
        currentUserId: cardData.owner._id
      });
      placesList.prepend(cardElement);
      closePopup(newCardPopup);
      newCardFormElement.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = initialText;
      submitButton.disabled = false;
    });
}

newCardFormElement.addEventListener('submit', handleNewCardSubmit);

// Включаем валидацию
enableValidation(validationConfig);