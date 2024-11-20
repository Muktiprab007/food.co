import CONFIG from '../../globals/config';

// Template untuk detail restoran
const createRestaurantDetailTemplate = (restaurant) => {
  const categories = restaurant.categories ? restaurant.categories.map(category => category.name).join(', ') : 'No categories';
  
  // Makanan dan minuman diubah menjadi HTML elemen berbasis grid
  const foods = restaurant.menus?.foods 
    ? restaurant.menus.foods.map(food => `<div class="food-item">${food.name}</div>`).join('')
    : '<p>No foods available</p>';
  
  const drinks = restaurant.menus?.drinks 
    ? restaurant.menus.drinks.map(drink => `<div class="drink-item">${drink.name}</div>`).join('')
    : '<p>No drinks available</p>';

  // Reviews dalam grid layout
  const reviews = restaurant.customerReviews 
    ? restaurant.customerReviews.map(review => `
        <div class="review-card">
          <p class="review-name"><strong>${review.name}</strong></p>
          <p class="review-date">${review.date}</p>
          <p class="review-text">${review.review}</p>
        </div>
      `).join('')
    : '<p>No reviews available</p>';

  return `
    <div class="hero">
      <img class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL.LARGE + restaurant.pictureId}" alt="${restaurant.name}" />
      <div class="hero--text">
        <h1 class="restaurant__title">${restaurant.name}</h1>
      </div>
    </div>

    <div class="detail_box">
      <div class="restaurant__details">
        <div class="info-box">
          <i class="fa-solid fa-layer-group"></i>
          <h4>Categories</h4>
          <p>${categories}</p>
        </div>
        <div class="info-box">
          <i class="fa-solid fa-location-dot"></i>
          <h4>Address</h4>
          <p>${restaurant.address}</p>
        </div>
        <div class="info-box">
          <i class="fa-solid fa-city"></i>
          <h4>City</h4>
          <p>${restaurant.city}</p>
        </div>
        <div class="info-box">
          <i class="fa-solid fa-star"></i>
          <h4>Rating</h4>
          <p>${restaurant.rating || 'No rating available'}</p>
        </div>
      </div>
      
      <div class="restaurant__overview">
        <h2><i class="fa-solid fa-quote-left"></i>Description</h2>
        <small>${restaurant.description}</small>
      </div>
      
      <div class="restaurant__menu">
        <div class="menu-container">
          <div class="menu-box foods">
            <h3><i class="fa-solid fa-bowl-food"></i>Foods</h3>
            <div class="food-list">
              ${foods}
            </div>
          </div>
        </div>
        <div class="menu-container">
          <div class="menu-box drinks">
            <h3><i class="fa-solid fa-mug-hot"></i>Drinks</h3>
            <div class="drink-list">
              ${drinks}
            </div>
          </div>
        </div>
      </div>

        <div class="reviews">
        <div class="restaurant__reviews">
          <form id="reviewForm" class="review-form">
            <h3><i class="fa-solid fa-comments"></i>Add Your Review</h3>
            <input type="text" id="reviewName" placeholder="Your Name" required />
            <textarea id="reviewText" placeholder="Your Review" required></textarea>
            <button type="submit">Submit Review</button>
          </form>

          <h3> Reviews</h3>
          <div id="reviewGrid" class="review-grid">
            ${reviews}
          </div>
        </div>
      </div>
    </div>
  `;
};




// Template untuk item restoran (daftar restoran)
const createRestaurantItemTemplate = (restaurant) => `
  <div tabindex="0" class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster" alt="${restaurant.name} "
           src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL.MEDIUM + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
      <div class="restaurant-item__header__city">
        <p tabindex="0">${restaurant.city}</p>
      </div>
      <div class="restaurant-item__header__rating">
        <p tabindex="0">⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
      <p tabindex="0">${restaurant.description}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;
 
const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export { 
  createRestaurantItemTemplate, 
  createRestaurantDetailTemplate, 
  createLikeButtonTemplate, 
  createLikedButtonTemplate, 
};
