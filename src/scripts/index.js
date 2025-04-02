import './pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Modal from '../components/Modal.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, validationConfig } from '../utils/constants.js';

// Инициализация модальных окон
const editProfileModal = new Modal('.modal_type_edit');
const addCardModal = new Modal('.modal_type_add');
const imageModal = new Modal('.modal_type_image');

// Инициализация валидации форм
const editFormValidator = new FormValidator(validationConfig, document.forms['edit-profile']);
const addCardFormValidator = new FormValidator(validationConfig, document.forms['add-place']);

// Инициализация секции с карточками
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', (name, link) => {
      document.querySelector('.modal__image').src = link;
      document.querySelector('.modal__image').alt = name;
      document.querySelector('.modal__caption').textContent = name;
      imageModal.open();
    });
    return card.generateCard();
  }
}, '.cards__list');

// Инициализация информации о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__description'
});

// Обработчики событий
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  document.querySelector('#name-input').value = name;
  document.querySelector('#job-input').value = job;
  editFormValidator.resetValidation();
  editProfileModal.open();
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addCardModal.open();
});

document.forms['edit-profile'].addEventListener('submit', (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo({
    name: document.querySelector('#name-input').value,
    job: document.querySelector('#job-input').value
  });
  editProfileModal.close();
});

document.forms['add-place'].addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = document.querySelector('#place-name-input').value;
  const link = document.querySelector('#place-link-input').value;
  
  cardSection.addItem({ name, link });
  addCardModal.close();
  evt.target.reset();
});

// Инициализация
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
cardSection.renderItems();