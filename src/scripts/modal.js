function handleEscapeKey(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
    }
  }
  
  function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closeModal(evt.target);
    }
  }
  
  export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscapeKey);
    popup.addEventListener('mousedown', handleOverlayClick);
  }
  
  export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscapeKey);
    popup.removeEventListener('mousedown', handleOverlayClick);
  }