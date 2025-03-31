import './pages/index.css';
import Card from './scripts/Card';
import FormValidator from './scripts/FormValidator';
import Section from './scripts/Section';
import PopupWithImage from './scripts/PopupWithImage';
import PopupWithForm from './scripts/PopupWithForm';
import UserInfo from './scripts/UserInfo';
import { initialCards, validationConfig, selectors } from './scripts/constants';

// Инициализация
const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  aboutSelector: selectors.profileAbout
});

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, selectors.cardTemplate, handleCardClick);
    return card.generateCard();
  }
}, selectors.placesList);

const popupWithImage = new PopupWithImage(selectors.popupImage);
const popupEditProfile = new PopupWithForm(selectors.popupEdit, handleProfileFormSubmit);
const popupAddCard = new PopupWithForm(selectors.popupAddCard, handleCardFormSubmit);

// Обработчики
function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo(formData);
  popupEditProfile.close();
}

function handleCardFormSubmit(formData) {
  const newCard = {
    name: formData.place,
    link: formData.link
  };
  
  const card = new Card(newCard, selectors.cardTemplate, handleCardClick);
  cardSection.addItem(card.generateCard());
  popupAddCard.close();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Установка слушателей
document.querySelector(selectors.profileEditButton).addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});

document.querySelector(selectors.profileAddButton).addEventListener('click', () => {
  popupAddCard.open();
});

// Запуск
cardSection.renderItems();
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();