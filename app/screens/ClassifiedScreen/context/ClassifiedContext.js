import React, {useReducer} from 'react';
import reducer from './reducer';
import {categories} from './categories';
import {fetchRecommendations} from './api.service';

const initialState = {
  search: '',
  categories: categories,
  products: {
    isLoading: true,
    entities: [],
    error: '',
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
};

const ClassifiedContext = React.createContext();

function ClassifiedProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const loadRecommendations = () => {
    requestAnimationFrame(() => {
      setRecommendations({isLoading: true, error: ''});
      fetchRecommendations()
        .then(entities => {
          setRecommendations({entities, isLoading: false, error: ''});
        })
        .catch(err => {
          setRecommendations({
            error: err.toString() || 'Something went wrong, please try again.',
            isLoading: false,
          });
        });
    });
  };

  const loadProducts = () => {
    requestAnimationFrame(() => {
      setProducts({entities: []});
    });
  };

  const loadAlerts = () => {
    requestAnimationFrame(() => {
      setAlerts({entities: []});
    });
  };

  const providerValue = {
    ...state,
    dispatch,
    loadRecommendations,
    loadProducts,
    loadAlerts,
  };

  return (
    <ClassifiedContext.Provider value={providerValue}>
      {props.children}
    </ClassifiedContext.Provider>
  );
}

export {ClassifiedContext, ClassifiedProvider};
