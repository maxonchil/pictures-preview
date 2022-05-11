import { Picture } from '@services/pictures';

export interface PicturesStore {
    pictures: Record<string, Picture>,
    pageInfo: PageInfo,
    isLoading: boolean,
    loaded: boolean,
    error: string,
}

export interface PageInfo {
    currentPage: number,
    nextPage: number,
}

export interface UpdatePicturePayload {
    id: string,
    patch: Partial<Picture>,
}

export interface GetNextPicturePayload {
    pictures: Picture[],
    pageInfo: PageInfo,
}

export type GetNextPictureErrorPayload = Pick<PicturesStore, 'error'>;

export enum PicturesActionTypes {
    GetNext = '[Pictures] Get next',
    GetNextSuccess = '[Pictures] Get Next Success',
    GetNextError = '[Pictures] Get Next Error',
    UpdatePicture = '[Pictures] Update Picture',
}
