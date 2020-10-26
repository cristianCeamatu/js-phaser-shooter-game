export default () => {
  const element = document.createElement('form');
  element.className = 'text-center shadow-lg p-2 p-md-5 my-5 mx-auto d-block h3 bg-dark text-white rounded';
  element.setAttribute('action', '/');
  element.id = 'form';

  element.innerHTML = `
    <div class="form-group">
      <label for="nickname">You need a</label>
      <input type="text" name="nickname" id="nickname" class="form-control my-3" placeholder="NICKNAME" minlength="3"
        maxlength="8">
      <p>If you want to play</p>
    </div>
    <button type="submit" class="p-2 rounded  bg-danger text-white text-uppercase" id="form-button"
      disabled="true">Micro
      Shooters
      <img src="favicon.ico" alt="Logo" class="shadow">
    </button>
  `;

  return element;
};
