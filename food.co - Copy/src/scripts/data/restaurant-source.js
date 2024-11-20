import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async Home() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);  // API call to fetch restaurant data
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      const responseJson = await response.json();
      return responseJson.restaurants;  // Return the list of restaurants
    } catch (error) {
      console.error('Error fetching home restaurants:', error);
      return [];  // Return empty array if there's an error
    }
  }

  static async Favorite() {
    const response = await fetch(API_ENDPOINT.UPCOMING);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const data = await response.json();
    return data.restaurant
  }

  static async addReview(review) {
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
  
      const responseJson = await response.json();

      
  
      if (!response.ok) {
        throw new Error(responseJson.message || 'Failed to add review');
      }
  
      return responseJson;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }
}

export default TheRestaurantDbSource;
