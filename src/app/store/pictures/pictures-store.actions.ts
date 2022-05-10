import { createAction, props } from '@ngrx/store';
import { PageInfo } from './pictures-store.types';
import { Picture } from '../../services/pictures';

export const getNextPicturesPage = createAction('[Pictures] Get next');
export const getNextPicturesPageSuccess = createAction('[Pictures] Get Next Success', props<{ pictures: Picture[], pageInfo: PageInfo}>());
export const getNextPicturesPageError = createAction('[Pictures] Get Next Error', props<{ error: string }>());
