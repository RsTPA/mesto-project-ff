export function safeInit(mainInitFunction) {
    document.addEventListener('DOMContentLoaded', () => {
      const requiredElements = {
        profileSection: '.profile',
        cardsContainer: '.places__list',
        editProfileModal: '.popup_type_edit',
        addCardModal: '.popup_type_new-card',
        imagePreviewModal: '.popup_type_image',
        editAvatarModal: '.popup_type_edit-avatar'
      };
  
      const elements = {};
      let allElementsFound = true;
  
      for (const [key, selector] of Object.entries(requiredElements)) {
        elements[key] = document.querySelector(selector);
        if (!elements[key]) {
          console.error(`Не найден обязательный элемент: ${selector}`);
          allElementsFound = false;
        }
      }
  
      if (allElementsFound) {
        // Добавляем контейнер для аватара если его нет
        const profileImage = document.querySelector('.profile__image');
        if (profileImage && !profileImage.parentElement.classList.contains('profile__image-container')) {
          const container = document.createElement('div');
          container.className = 'profile__image-container';
          profileImage.parentNode.insertBefore(container, profileImage);
          container.appendChild(profileImage);
          
          const editButton = document.createElement('button');
          editButton.className = 'profile__image-edit-button';
          editButton.type = 'button';
          container.appendChild(editButton);
        }
  
        mainInitFunction();
      } else {
        console.error('Приложение не может быть инициализировано из-за отсутствия обязательных элементов');
      }
    });
  }