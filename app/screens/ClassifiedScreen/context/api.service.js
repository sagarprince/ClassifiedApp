import axios from 'axios';
import FormData from 'form-data';
import RNFetchBlob from 'rn-fetch-blob';

const GCLOUD_API_KEY = 'AIzaSyDKyMtjiMM-BNDn9gE_jmYj5tUi6alUAwA';

const API_BASE_URL = 'https://classifiedserver.herokuapp.com';
// const API_BASE_URL = 'http://192.168.0.102:3004';
const IMAGE_UPLOAD_URL = 'https://api.imgbb.com/1/upload?key=df3d504031d2907f76602f3400519ea1';
const PLACES_AUTOCOMPLETE_API_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GCLOUD_API_KEY}&sessiontoken=383483242`;
const FORWARD_GEOCODE_API_URL = 'https://geocode.xyz?auth=18054595166009333541x5296&geoit=json';
const REVERSE_GEOCODE_API_URL = 'https://api.opencagedata.com/geocode/v1/json?key=87db9f1a1fc84e869da13608fee0c496&pretty=1&no_annotations=1';

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

  fetchPlaces(searchTerm) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${PLACES_AUTOCOMPLETE_API_URL}&input=${searchTerm}`)
        .then(response => {
          const places = response.data.predictions.map((item) => {
            return {
              id: item.place_id,
              name: item.description,
              selected: false
            };
          });
          resolve(places);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  fetchForwardGeocode(address) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${FORWARD_GEOCODE_API_URL}&locate=${address}`)
        .then(response => {
          const data = response.data;
          const location = {
            lat: data.latt,
            lng: data.longt
          };
          resolve(location);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  fetchReverseGeocode(location) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${REVERSE_GEOCODE_API_URL}&q=${location.join(',')}`)
        .then(response => {
          const data = response.data;
          const address = data.results.length > 0 ? results[0].formatted : '';
          resolve(address);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default apiService = new ApiService();