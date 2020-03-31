import axios from 'axios';

export const API_BASE_URL = 'https://classifiedserver.herokuapp.com';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export function fetchRecommendations() {
  return new Promise((resolve, reject) => {
    instance
      .get('/products')
      .then(response => {
        setTimeout(() => resolve(response.data), 2000);
      })
      .catch(error => {
        setTimeout(() => reject(error), 2000);
      });
  });
}
