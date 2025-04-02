export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button')
      .addEventListener('click', () => this._handleLikeIcon());
    
    this._element.querySelector('.card__delete-button')
      .addEventListener('click', () => this._handleDeleteCard());
    
    this._element.querySelector('.card__image')
      .addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _handleLikeIcon() {
    this._element.querySelector('.card__like-button')
      .classList.toggle('card__like-button_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    
    return this._element;
  }
}