import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/style.scss';

function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello world1!';
  element.classList.add('h3');

  return element;
}

document.body.appendChild(component());
