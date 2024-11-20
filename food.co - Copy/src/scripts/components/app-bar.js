class AppBar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header class="app-bar">
          <div class="app-bar__menu">
            <button id="hamburgerButton" style="color: white">☰</button>
          </div>
          <div class="app-bar__brand">
            <h1>Food.co</h1>
          </div>
          <nav id="navigationDrawer" class="app-bar__navigation">
            <ul>
              <li><a href="#/home"><i class="fa-solid fa-house"></i>Home</a></li>
              <li><a href="#/Favorite"><i class="fa-solid fa-heart"></i>Favorite</a></li>
              <li><a href="https://linkedin.com/in/muktiprabowo" target="_blank">
                <i class="fa-solid fa-user"></i>About Us
              </a></li>
            </ul>
          </nav>
        </header>
      `;
      const hamburgerButton = this.querySelector('#hamburgerButton');
      if (hamburgerButton) {
        hamburgerButton.addEventListener('click', () => {
          console.log('Hamburger button clicked from Web Component!');
        });
      } else {
        console.error('Hamburger button not found in Web Component.');
      }
    }
  }
  
  customElements.define('app-bar', AppBar);