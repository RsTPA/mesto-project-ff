export function renderLoading(isLoading, button, initialText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
      button.textContent = loadingText;
    } else {
      button.textContent = initialText;
    }
  }
  
  export function handleSubmit(request, popup, loadingText = 'Сохранение...') {
    const submitButton = popup.querySelector('.popup__button');
    const initialText = submitButton.textContent;
  
    renderLoading(true, submitButton, initialText, loadingText);
    
    request()
      .then(() => closePopup(popup))
      .catch(err => console.error(err))
      .finally(() => {
        renderLoading(false, submitButton, initialText);
      });
  }