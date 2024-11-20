import TheRestaurantDbSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div class="content">
        <div id="restaurant" class="restaurant"></div>
        <div id="likeButtonContainer"></div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');

    if (restaurant) {
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          city: restaurant.city,
        },
      });

      const reviewForm = document.querySelector('#reviewForm');
      reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const reviewName = document.querySelector('#reviewName').value;
        const reviewText = document.querySelector('#reviewText').value;

        if (reviewName && reviewText) {
          const newReview = {
            id: url.id,
            name: reviewName,
            review: reviewText,
          };

          try {
            // Kirim ulasan baru ke server
            await TheRestaurantDbSource.addReview(newReview);

            // Tambahkan ulasan baru langsung ke DOM tanpa memuat ulang
            const reviewGrid = document.querySelector('#reviewGrid');
            const newReviewElement = `
              <div class="review-card">
                <p class="review-name"><strong>${reviewName}</strong></p>
                <p class="review-date">${new Date().toLocaleDateString()}</p>
                <p class="review-text">${reviewText}</p>
              </div>
            `;

            // Tambahkan ulasan ke bagian atas ulasan yang ada
            reviewGrid.insertAdjacentHTML('afterbegin', newReviewElement);

            // Reset formulir ulasan
            reviewForm.reset();
          } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Failed to submit review. Please try again later.');
          }
        } else {
          alert('Please fill in both fields.');
        }
      });
    } else {
      restaurantContainer.innerHTML = '<p>Restaurant data not found.</p>';
    }
  },
};

export default Detail;
