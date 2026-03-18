import './assets/styles/main.css';
import { PublicLayout } from './layouts/PublicLayout.js';
import { HomePage } from './pages/Home.js';

const app = document.querySelector('#app');

function render() {
  // Kita bungkus HomePage di dalam Layout (supaya ada Navbarnya)
  app.innerHTML = PublicLayout(HomePage());
}

render();