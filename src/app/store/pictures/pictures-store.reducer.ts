import { createReducer, on } from '@ngrx/store';
import { getNextPicturesPage, getNextPicturesPageError, getNextPicturesPageSuccess, updatePicture } from './pictures-store.actions';
import { Picture } from '@services/pictures';

const initialState = {
    pictures: {} as Record<string, Picture>,
    pageInfo: {
        currentPage: 0,
        nextPage: 1,
    },
    isLoading: true,
    loaded: false,
    error: '',
};

export const picturesReducer = createReducer(
    initialState,
    on(getNextPicturesPage, (state) => ({ ...state, isLoading: true })),
    on(getNextPicturesPageSuccess, (state, { pictures, pageInfo }) => {
        const updatedPicturesMap: Record<string, Picture> = pictures.reduce((memo, picture: Picture) => {
            (memo as Record<string, Picture>)[picture.id] = picture;
            return memo;
        }, {});
        const updatePageInfo = { ...state.pageInfo, ...pageInfo };
        const updatePictures = { ...state.pictures, ...updatedPicturesMap };

        return {
            ...state,
            pictures: updatePictures,
            pageInfo: updatePageInfo,
            isLoading: false,
            loaded: true,
        };
    }),
    on(updatePicture, (state, { id, patch }) => {
        const updatedPictures: Record<string, Picture> = {
            ...state.pictures,
            [id]: { ...state.pictures[id], ...patch },
        };

        return { ...state, pictures: updatedPictures};
    }),
    on(getNextPicturesPageError, (state, { error }) => ({ ...state, error })),
);
