import React, { useReducer } from 'react';
import reducer from './reducer';
import { categories } from './categories';
import apiService from './api.service';

const initialState = {
  currentLocation: '',
  search: '',
  categories: categories,
  places: {
    isLoading: true,
    entities: [],
    error: '',
  },
  products: {
    isLoading: true,
    entities: [],
    error: '',
  },
  productCRUD: {
    isLoading: false,
  },
  recommendations: {
    isLoading: true,
    entities: [],
    error: '',
  },
  alerts: {
    isLoading: true,
    entities: [],
    error: '',
  },
  alertCRUD: {
    isLoading: true
  }
};

const ClassifiedContext = React.createContext();

function ClassifiedProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPlaces = payload => {
    dispatch({
      payload: {
        places: {
          ...state.places,
          ...payload,
        },
      },
    });
  };

  const setRecommendations = payload => {
    dispatch({
      payload: {
        recommendations: {
          ...state.recommendations,
          ...payload,
        },
      },
    });
  };

  const setProducts = payload => {
    dispatch({
      payload: {
        products: {
          ...state.products,
          ...payload,
        },
      },
    });
  };

  const setProductCRUD = payload => {
    dispatch({
      payload: {
        productCRUD: {
          ...state.productCRUD,
          ...payload,
        },
      },
    });
  };

  const setAlerts = payload => {
    dispatch({
      payload: {
        products: {
          ...state.alerts,
          ...payload,
        },
      },
    });
  };

  const fetchPlaces = (searchTerm) => {
    requestAnimationFrame(() => {
      setPlaces({ isLoading: true, error: '' });
      apiService.fetchPlaces(searchTerm)
        .then(entities => {
          setPlaces({ entities, isLoading: false, error: '' });
        })
        .catch(err => {
          setPlaces({
            error: err.toString() || 'Something went wrong, please try again.',
            isLoading: false,
          });
        });
    });
  };

  const fetchForwardGeocode = (address) => {
    return apiService.fetchForwardGeocode(address);
  };

  const fetchReverseGeocode = (location) => {
    return apiService.fetchReverseGeocode(location);
  };

  const fetchRecommendations = () => {
    requestAnimationFrame(() => {
      setRecommendations({ isLoading: true, error: '' });
      apiService.fetchRecommendations()
        .then(entities => {
          setRecommendations({ entities, isLoading: false, error: '' });
        })
        .catch(err => {
          setRecommendations({
            error: err.toString() || 'Something went wrong, please try again.',
            isLoading: false,
          });
        });
    });
  };

  const fetchProducts = () => {
    requestAnimationFrame(() => {
      setProducts({ entities: [] });
    });
  };

  const fetchAlerts = () => {
    requestAnimationFrame(() => {
      setAlerts({ entities: [] });
    });
  };

  const saveProduct = (product) => {
    return new Promise((resolve, reject) => {
      requestAnimationFrame(() => {
        const promises = [];
        setProductCRUD({ isLoading: true });
        product.photos.forEach((photo) => {
          promises.push(apiService.saveProductImage(photo.uri));
        });

        Promise.all(promises).then((results) => {
          const photos = results.map((result) => {
            const photo = result.data;
            return {
              id: photo.id,
              thumbUrl: photo.thumb.url,
              url: photo.url,
              uploaded: true
            };
          });
          product.photos = photos;
          apiService.saveProduct(product)
            .then((data) => {
              resolve(data);
            })
            .catch(err => {
              reject(err);
            }).finally(() => {
              setProductCRUD({ isLoading: false });
            });
        }).catch(() => {
          reject('Something went wrong, please try again.');
          setProductCRUD({ isLoading: false });
        })
      });
    });
  }

  const providerValue = {
    ...state,
    dispatch,
    setPlaces,
    fetchPlaces,
    fetchForwardGeocode,
    fetchReverseGeocode,
    fetchRecommendations,
    fetchProducts,
    fetchAlerts,
    saveProduct
  };

  return (
    <ClassifiedContext.Provider value={providerValue}>
      {props.children}
    </ClassifiedContext.Provider>
  );
}

export { ClassifiedContext, ClassifiedProvider };
