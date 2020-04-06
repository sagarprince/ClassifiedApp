import React, {useReducer} from 'react';
import {of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import reducer from './reducer';
import apiService from './api.service';
import {initialState} from './initial.state';

const ClassifiedContext = React.createContext();

function ClassifiedProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPlaces = (type, payload) => {
    if (type === 'user') {
      dispatch({
        payload: {
          userPlaces: {
            ...state.userPlaces,
            ...payload,
          },
        },
      });
    } else {
      dispatch({
        payload: {
          productFormPlaces: {
            ...state.productFormPlaces,
            ...payload,
          },
        },
      });
    }
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

  const fetchPlaces = (type, searchTerm) => {
    setPlaces(type, {isLoading: true, error: ''});
    return apiService.fetchPlaces(searchTerm).pipe(
      map(entities => {
        console.log('ENTITIES ', entities.map(x => x.name));
        setPlaces(type, {entities, isLoading: false, error: ''});
        return entities;
      }),
      catchError(err => {
        setPlaces(type, {
          entities: [],
          isLoading: false,
          error: err.toString() || 'Something went wrong, please try again.',
        });
        return of(err);
      }),
    );
  };

  const fetchForwardGeocode = address => {
    return apiService.fetchForwardGeocode(address);
  };

  const fetchReverseGeocode = location => {
    return apiService.fetchReverseGeocode(location);
  };

  const fetchRecommendations = () => {
    setRecommendations({isLoading: true, error: ''});
    return apiService.fetchRecommendations().pipe(
      map(entities => {
        console.log(entities);
        setRecommendations({entities, isLoading: false, error: ''});
      }),
      catchError(err => {
        setRecommendations({
          error: err.toString() || 'Something went wrong, please try again.',
          entities: [],
          isLoading: false,
        });
        return of(err);
      }),
    );
  };

  const fetchProducts = () => {
    requestAnimationFrame(() => {
      setProducts({entities: []});
    });
  };

  const fetchAlerts = () => {
    requestAnimationFrame(() => {
      setAlerts({entities: []});
    });
  };

  const saveProduct = product => {
    return new Promise((resolve, reject) => {
      requestAnimationFrame(() => {
        const promises = [];
        setProductCRUD({isLoading: true});
        product.photos.forEach(photo => {
          promises.push(apiService.saveProductImage(photo.uri));
        });

        Promise.all(promises)
          .then(results => {
            const photos = results.map(result => {
              const photo = result.data;
              return {
                id: photo.id,
                thumbUrl: photo.thumb.url,
                url: photo.url,
                uploaded: true,
              };
            });
            product.photos = photos;
            apiService
              .saveProduct(product)
              .then(data => {
                resolve(data);
              })
              .catch(err => {
                reject(err);
              })
              .finally(() => {
                setProductCRUD({isLoading: false});
              });
          })
          .catch(() => {
            reject('Something went wrong, please try again.');
            setProductCRUD({isLoading: false});
          });
      });
    });
  };

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
    saveProduct,
  };

  return (
    <ClassifiedContext.Provider value={providerValue}>
      {props.children}
    </ClassifiedContext.Provider>
  );
}

export {ClassifiedContext, ClassifiedProvider};
