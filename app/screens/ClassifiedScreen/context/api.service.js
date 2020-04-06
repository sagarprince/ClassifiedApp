import axios from 'axios';
import Axios from 'axios-observable';
import {distinctUntilChanged, map, delay} from 'rxjs/operators';
import FormData from 'form-data';
import RNFetchBlob from 'rn-fetch-blob';

const GCLOUD_API_KEY = 'AIzaSyDKyMtjiMM-BNDn9gE_jmYj5tUi6alUAwA';

const API_BASE_URL = 'https://classifiedserver.herokuapp.com';
// const API_BASE_URL = 'http://localhost:3004';
const IMAGE_UPLOAD_URL =
  'https://api.imgbb.com/1/upload?key=df3d504031d2907f76602f3400519ea1';
const PLACES_AUTOCOMPLETE_API_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GCLOUD_API_KEY}&sessiontoken=383483242`;
const FORWARD_GEOCODE_API_URL =
  'https://geocode.xyz?auth=18054595166009333541x5296&geoit=json';
const REVERSE_GEOCODE_API_URL =
  'https://api.opencagedata.com/geocode/v1/json?key=87db9f1a1fc84e869da13608fee0c496&pretty=1&no_annotations=1';

class ApiService {
  fetchRecommendations() {
    return Axios.get(`${API_BASE_URL}/products`).pipe(
      delay(1500),
      map(response => response.data),
    );
  }

  saveProduct(product) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE_URL}/products`, product)
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
      RNFetchBlob.fs
        .readFile(imageUri.replace('file://', ''), 'base64')
        .then(data => {
          requestAnimationFrame(() => {
            const formData = new FormData();
            formData.append('image', data);
            axios
              .post(IMAGE_UPLOAD_URL, formData, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(response => {
                resolve(response.data);
              })
              .catch(err => {
                reject(err);
              });
          });
        })
        .catch(() => {
          reject('Something went wrong, please try again.');
        });
    });
  }

  fetchPlaces(searchTerm) {
    return Axios.get(`${PLACES_AUTOCOMPLETE_API_URL}&input=${searchTerm}`).pipe(
      distinctUntilChanged(),
      map(response => {
        const places = response.data.predictions.map(item => {
          return {
            id: item.place_id,
            name: item.description,
            selected: false,
            lat: '',
            lng: '',
          };
        });
        return places;
      }),
    );
  }

  fetchForwardGeocode(address) {
    return Axios.get(`${FORWARD_GEOCODE_API_URL}&locate=${address}`).pipe(
      map(response => {
        const data = response.data;
        const location = {
          lat: data.latt,
          lng: data.longt,
        };
        return location;
      }),
    );
  }

  fetchReverseGeocode(location) {
    return Axios.get(`${REVERSE_GEOCODE_API_URL}&q=${location.join(',')}`).pipe(
      map(response => {
        const data = response.data;
        return data.results.length > 0 ? data.results[0].formatted : '';
      }),
    );
  }
}
const apiService = new ApiService();
export default apiService;
