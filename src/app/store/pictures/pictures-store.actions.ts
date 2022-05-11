import { createAction, props } from '@ngrx/store';
import { GetNextPictureErrorPayload, GetNextPicturePayload, PicturesActionTypes, UpdatePicturePayload } from './pictures-store.types';

export const getNextPicturesPage = createAction(PicturesActionTypes.GetNext);
export const getNextPicturesPageSuccess = createAction(PicturesActionTypes.GetNextSuccess, props<GetNextPicturePayload>());
export const getNextPicturesPageError = createAction(PicturesActionTypes.GetNextError, props<GetNextPictureErrorPayload>());
export const updatePicture = createAction(PicturesActionTypes.UpdatePicture, props<UpdatePicturePayload>());
