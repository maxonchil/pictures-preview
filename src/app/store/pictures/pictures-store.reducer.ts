import { createReducer, on } from '@ngrx/store';
import { getNextPicturesPage, getNextPicturesPageError, getNextPicturesPageSuccess } from './pictures-store.actions';
import { Picture } from '../../services/pictures';

const initialState = {
    pictures: [] as Picture[],
    favoritesIds: [] as string[],
    isLoading: false,
    pageInfo: {
        currentPage: 0,
        nextPage: 1,
    },
    error: '',
};

export const picturesReducer = createReducer(
    initialState,
    on(getNextPicturesPage, (state) => ({ ...state, isLoading: true })),
    on(getNextPicturesPageSuccess, (state, { pictures, pageInfo }) => ({
        ...state,
        pictures: [...state.pictures, ...pictures ],
        pageInfo: {
            ...state.pageInfo,
            ...pageInfo,
        },
        isLoading: false,
    })),
    on(getNextPicturesPageError, (state, { error }) => ({ ...state, error })),
);
