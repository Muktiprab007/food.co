import TheRestaurantDbSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section class="hero">
        <img src="./images/heros/hero-image_2.jpg" width="450" alt="Hero Restaurant Image"/>
        <div class="hero-text">
          <h1>Explore Restaurants</h1>
          <button class="explore" onclick="document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' })">Explore Now</button>
        </div>
      </section>
      <div class="content" id="content">
        <div id="restaurants" class="restaurants">
          <!-- Restaurant list will be dynamically inserted here -->
        </div>
      </div>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await TheRestaurantDbSource.Home();  // Fetch restaurant data
      const restaurantsContainer = document.querySelector('#restaurants');

      // Check if restaurants exist
      if (restaurants.length > 0) {
        restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
      } else {
        restaurantsContainer.innerHTML = '<p>No restaurants found.</p>';
      }
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  },
};

export default Home;
