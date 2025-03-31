export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this));
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _handleImageError() {
    this._cardImage.src = 'https://example.com/default-image.jpg';
    this._cardImage.alt = 'Изображение не загружено';
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _renderLikes() {
    this._likeCount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }

  isLiked() {
    return this._likes.some(user => user._id === this._userId);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._likeCount = this._element.querySelector('.card__like-count');

    // Защита от XSS - используем textContent вместо innerHTML
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    
    // Обработка ошибок загрузки изображения
    this._cardImage.onerror = this._handleImageError;

    this._renderLikes();
    this._setEventListeners();

    return this._element;
  }
}