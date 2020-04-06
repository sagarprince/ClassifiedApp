import {categories} from './categories';

export const initialState = {
    userLocation: {},
    search: '',
    categories: categories,
    userPlaces: {
        isGPSEnabled: false,
        searchTerm: '',
        isLoading: false,
        isSelectedLoading: false,
        entities: [],
        error: '',
    },
    productFormPlaces: {
        isGPSEnabled: false,
        isLoading: false,
        isSelectedLoading: false,
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
        isLoading: true,
    },
};