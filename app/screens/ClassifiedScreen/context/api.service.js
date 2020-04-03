import axios from 'axios';
import FormData from 'form-data';
import RNFetchBlob from 'rn-fetch-blob';

// export const API_BASE_URL = 'https://classifiedserver.herokuapp.com';
const API_BASE_URL = 'http://192.168.0.102:3004';
const IMAGE_UPLOAD_URL = 'https://api.imgbb.com/1/upload?key=df3d504031d2907f76602f3400519ea1'

const instance = axios.create({
  baseURL: API_BASE_URL,
});

class ApiService {
  fetchRecommendations() {
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

  saveProduct(product) {
    return new Promise((resolve, reject) => {
      instance
        .post('/products', product)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  saveProductImage(imageUri) {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fs.readFile(imageUri.replace('file://', ''), 'base64').then((data) => {
        requestAnimationFrame(() => {
          const formData = new FormData();
          formData.append('image', data);
          axios.post(IMAGE_UPLOAD_URL, formData, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          }).then((response) => {
            resolve(response.data);
          }).catch((err) => {
            reject(err);
          });
        });
      }).catch(() => {
        reject('Something went wrong, please try again.');
      });
    });
  }
}

export default apiService = new ApiService();