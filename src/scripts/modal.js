function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_opened');
    if (openedModal) closeModal(openedModal);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

export function openModal(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

export function closeModal(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

export function setupModalCloseListeners() {
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', handleOverlayClick);
    
    const closeButton = popup.querySelector('.popup__close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => closeModal(popup));
    }
  });
}