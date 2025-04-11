/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto-project-ff-3791f73233667b519ece0175dcae685568229a38/./src/pages/index.css?");

/***/ }),

/***/ "./src/scripts/card.js":
/*!*****************************!*\
  !*** ./src/scripts/card.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard),\n/* harmony export */   handleLikeButton: () => (/* binding */ handleLikeButton)\n/* harmony export */ });\nfunction createCard(cardData, deleteCallback, handleLikeButton, handleImageClick) {\n  var cardTemplate = document.querySelector('#card-template').content;\n  var cardElement = cardTemplate.querySelector('.card').cloneNode(true);\n  var cardImage = cardElement.querySelector('.card__image');\n  var cardTitle = cardElement.querySelector('.card__title');\n  cardImage.src = cardData.link;\n  cardImage.alt = cardData.name;\n  cardTitle.textContent = cardData.name;\n  var likeButton = cardElement.querySelector('.card__like-button');\n  likeButton.addEventListener('click', handleLikeButton);\n  cardImage.addEventListener('click', function () {\n    return handleImageClick(cardData);\n  });\n  var deleteButton = cardElement.querySelector('.card__delete-button');\n  deleteButton.addEventListener('click', function () {\n    deleteCallback(cardElement);\n  });\n  return cardElement;\n}\nfunction deleteCard(cardElement) {\n  cardElement.remove();\n}\nfunction handleLikeButton(evt) {\n  evt.target.classList.toggle('card__like-button_is-active');\n}\n\n//# sourceURL=webpack://mesto-project-ff-3791f73233667b519ece0175dcae685568229a38/./src/scripts/card.js?");

/***/ }),

/***/ "./src/scripts/cards.js":
/*!******************************!*\
  !*** ./src/scripts/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initialCards: () => (/* binding */ initialCards)\n/* harmony export */ });\n\nvar initialCards = [{\n  name: \"Архыз\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg\"\n}, {\n  name: \"Челябинская область\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg\"\n}, {\n  name: \"Иваново\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg\"\n}, {\n  name: \"Камчатка\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg\"\n}, {\n  name: \"Холмогорский район\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg\"\n}, {\n  name: \"Байкал\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg\"\n}];\n\n//# sourceURL=webpack://mesto-project-ff-3791f73233667b519ece0175dcae685568229a38/./src/scripts/cards.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card.js */ \"./src/scripts/card.js\");\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal.js */ \"./src/scripts/modal.js\");\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cards.js */ \"./src/scripts/cards.js\");\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\n\n\n\n\n\n// DOM элементы\nvar cardsContainer = document.querySelector('.places__list');\nvar profileSection = document.querySelector('.profile');\nvar profileNameElement = profileSection.querySelector('.profile__title');\nvar profileJobElement = profileSection.querySelector('.profile__description');\n\n// Кнопки\nvar editProfileButton = profileSection.querySelector('.profile__edit-button');\nvar addCardButton = profileSection.querySelector('.profile__add-button');\n\n// Модальные окна\nvar editProfileModal = document.querySelector('.popup_type_edit');\nvar addCardModal = document.querySelector('.popup_type_new-card');\nvar imagePreviewModal = document.querySelector('.popup_type_image');\n\n// Элементы модальных окон\nvar modalImageElement = imagePreviewModal.querySelector('.popup__image');\nvar modalCaptionElement = imagePreviewModal.querySelector('.popup__caption');\n\n// Формы\nvar profileForm = document.forms['edit-profile'];\nvar cardForm = document.forms['new-place'];\n\n// Поля форм\nvar profileNameInput = profileForm.querySelector('.popup__input_type_name');\nvar profileJobInput = profileForm.querySelector('.popup__input_type_description');\nvar cardNameInput = cardForm.querySelector('.popup__input_type_card-name');\nvar cardLinkInput = cardForm.querySelector('.popup__input_type_url');\n\n// Валидация\nvar validationConfig = {\n  formSelector: '.popup__form',\n  inputSelector: '.popup__input',\n  submitButtonSelector: '.popup__button',\n  inactiveButtonClass: 'popup__button_disabled',\n  inputErrorClass: 'popup__input_type_error',\n  errorClass: 'popup__error_visible'\n};\n\n// Инициализация валидации\nenableValidation(validationConfig);\n\n// Инициализация карточек\nfunction renderInitialCards() {\n  _cards_js__WEBPACK_IMPORTED_MODULE_3__.initialCards.forEach(function (card) {\n    var newCard = (0,_card_js__WEBPACK_IMPORTED_MODULE_1__.createCard)(card, _card_js__WEBPACK_IMPORTED_MODULE_1__.deleteCard, _card_js__WEBPACK_IMPORTED_MODULE_1__.handleLikeButton, handleImageClick);\n    cardsContainer.append(newCard);\n  });\n}\n\n// Обработчики событий\nfunction handleImageClick(cardData) {\n  modalImageElement.src = cardData.link;\n  modalImageElement.alt = cardData.name;\n  modalCaptionElement.textContent = cardData.name;\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.openModal)(imagePreviewModal);\n}\nfunction handleFormEditProfileSubmit(evt) {\n  evt.preventDefault();\n  profileNameElement.textContent = profileNameInput.value;\n  profileJobElement.textContent = profileJobInput.value;\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.closeModal)(editProfileModal);\n}\nfunction handleFormNewPlaceSubmit(evt) {\n  evt.preventDefault();\n  var newCard = (0,_card_js__WEBPACK_IMPORTED_MODULE_1__.createCard)({\n    name: cardNameInput.value,\n    link: cardLinkInput.value\n  }, _card_js__WEBPACK_IMPORTED_MODULE_1__.deleteCard, _card_js__WEBPACK_IMPORTED_MODULE_1__.handleLikeButton, handleImageClick);\n  cardsContainer.prepend(newCard);\n  cardForm.reset();\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.closeModal)(addCardModal);\n}\nfunction setupEventListeners() {\n  // Открытие модальных окон\n  editProfileButton.addEventListener('click', function () {\n    profileNameInput.value = profileNameElement.textContent;\n    profileJobInput.value = profileJobElement.textContent;\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.openModal)(editProfileModal);\n  });\n  addCardButton.addEventListener('click', function () {\n    return (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.openModal)(addCardModal);\n  });\n\n  // Обработчики кнопок закрытия\n  document.querySelectorAll('.popup__close').forEach(function (closeButton) {\n    var popup = closeButton.closest('.popup');\n    closeButton.addEventListener('click', function () {\n      return (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.closeModal)(popup);\n    });\n  });\n\n  // Отправка форм\n  profileForm.addEventListener('submit', handleFormEditProfileSubmit);\n  cardForm.addEventListener('submit', handleFormNewPlaceSubmit);\n}\n\n// Загрузка данных при запуске\nfunction loadInitialData() {\n  Promise.all([getUserInfo(), getInitialCards()]).then(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n      userData = _ref2[0],\n      cards = _ref2[1];\n    updateProfileInfo(userData);\n    renderInitialCards(cards, userData._id);\n  })[\"catch\"](console.error);\n}\n\n// Обновление профиля\nfunction updateProfileInfo(userData) {\n  profileNameElement.textContent = userData.name;\n  profileJobElement.textContent = userData.about;\n  profileAvatarElement.style.backgroundImage = \"url(\".concat(userData.avatar, \")\");\n}\n\n// Инициализация приложения\nfunction init() {\n  renderInitialCards();\n  setupEventListeners();\n}\ninit();\n\n//# sourceURL=webpack://mesto-project-ff-3791f73233667b519ece0175dcae685568229a38/./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/modal.js":
/*!******************************!*\
  !*** ./src/scripts/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   openModal: () => (/* binding */ openModal)\n/* harmony export */ });\nvar openModal = function openModal(modal) {\n  modal.classList.add('popup_is-opened');\n  modal.addEventListener('mousedown', closeModalByOverlayClick);\n  document.addEventListener('keydown', closeModalByKey);\n};\nvar closeModal = function closeModal(modal) {\n  modal.classList.remove('popup_is-opened');\n  modal.removeEventListener('mousedown', closeModalByOverlayClick);\n  document.removeEventListener('keydown', closeModalByKey);\n};\nvar closeModalByOverlayClick = function closeModalByOverlayClick(event) {\n  if (event.target === event.currentTarget) {\n    closeModal(event.currentTarget);\n  }\n};\nvar closeModalByKey = function closeModalByKey(event) {\n  if (event.key === 'Escape') {\n    var modal = document.querySelector('.popup_is-opened');\n    if (modal) {\n      closeModal(modal);\n    }\n  }\n};\n\n\n//# sourceURL=webpack://mesto-project-ff-3791f73233667b519ece0175dcae685568229a38/./src/scripts/modal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;