const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    modal.addEventListener('mousedown', closeModalByOverlayClick);
    document.addEventListener('keydown', closeModalByKey);
};

const closeModal = (modal) => {
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('mousedown', closeModalByOverlayClick);
    document.removeEventListener('keydown', closeModalByKey);
};

const closeModalByOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal(event.currentTarget);
    }
};

const closeModalByKey = (event) => {
    if (event.key === 'Escape') {
        const modal = document.querySelector('.popup_is-opened');
        if (modal) {
            closeModal(modal);
        }
    }
};

export { openModal, closeModal };