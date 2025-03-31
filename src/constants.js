export const initialCards = [
    {
      name: "Скала над лесом",
      link: "https://plus.unsplash.com/premium_photo-1730145749791-28fc538d7203?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXx5SUZQXzJZUVRod3x8ZW58MHx8fHx8",
    },
    {
      name: "Вершина горы",
      link: "https://images.unsplash.com/photo-1716369415085-4a6876f91840?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnx5SUZQXzJZUVRod3x8ZW58MHx8fHx8",
    },
    {
      name: "Северное сияние",
      link: "https://images.unsplash.com/photo-1738189669835-61808a9d5981?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHx5SUZQXzJZUVRod3x8ZW58MHx8fHx8",
    },
    {
      name: "Арка в леднике",
      link: "https://plus.unsplash.com/premium_photo-1720020552784-f675b06605f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnx5SUZQXzJZUVRod3x8ZW58MHx8fHx8",
    },
    {
      name: "Водопад",
      link: "https://images.unsplash.com/photo-1740619061019-38581c1c293a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Разлом",
      link: "https://images.unsplash.com/photo-1740166260070-4d129541aa52?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
    }
];
  
  export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

  export const selectors = {
    cardTemplate: '#card-template',
    placesList: '.places__list',
    profileName: '.profile__name',
    profileAbout: '.profile__about',
    profileEditButton: '.profile__edit-button',
    profileAddButton: '.profile__add-button',
    popupEdit: '.popup_type_edit',
    popupAddCard: '.popup_type_add-card',
    popupImage: '.popup_type_image'
  };
  
  export const profileSelectors = {
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about'
  };
  
  export const profileEditButton = document.querySelector('.profile__edit-button');
  export const profileAddButton = document.querySelector('.profile__add-button');
  export const formEditProfile = document.forms['edit-profile'];
  export const formAddCard = document.forms['add-card'];