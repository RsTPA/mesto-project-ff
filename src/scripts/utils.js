export function setLoadingState(button, isLoading, defaultText = 'Сохранить') {
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Сохранение...' : defaultText;
  }