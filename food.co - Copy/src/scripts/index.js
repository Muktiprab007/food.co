import 'regenerator-runtime';
import '../styles/styles.scss';
import '../styles/responsive.scss';
import App from './views/app';
import swRegister from './utils/sw-register';
import './components/component.js';
 
const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});
 
window.addEventListener('hashchange', () => {
  app.renderPage();
  const urlHash = window.location.hash;
    if (urlHash.includes('/detail')) {
        scrollToTopButton.style.display = 'none';
    }
});
 
window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

const scrollToTopButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    const urlHash = window.location.hash;

    if (urlHash.includes('/detail')) {
        scrollToTopButton.style.display = 'none';
    } else if (window.pageYOffset > 1300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});
