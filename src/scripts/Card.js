export default class Card {
    constructor(data, templateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      return document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
    }
  
    _setEventListeners() {
      this._element.querySelector('.card__like-button')
        .addEventListener('click', () => this._handleLikeClick());
      
      this._element.querySelector('.card__delete-button')
        .addEventListener('click', () => this._handleDeleteClick());
      
      this._element.querySelector('.card__image')
        .addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }
  
    _handleLikeClick() {
      this._element.querySelector('.card__like-button')
        .classList.toggle('card__like-button_active');
    }
  
    _handleDeleteClick() {
      this._element.remove();
      this._element = null;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      const cardImage = this._element.querySelector('.card__image');
      const cardTitle = this._element.querySelector('.card__title');
  
      cardImage.src = this._link;
      cardImage.alt = this._name;
      cardTitle.textContent = this._name;
  
      this._setEventListeners();
  
      return this._element;
    }
  }