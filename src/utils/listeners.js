const inputListener = () => {
  document.querySelector('#nickname').addEventListener('input', (e) => {
    const { value } = e.target;
    const button = document.querySelector('#form-button');
    if (value.length > 2 && value.length < 8) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
};

const init = () => {
  inputListener();
};

export default { init };
