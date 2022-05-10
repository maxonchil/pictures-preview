import { Picture } from '../../services/pictures';

export interface PicturesStore {
    pictures: Picture[],
    pageInfo: PageInfo,
    isLoading: boolean,
    error: string,
}

export interface PageInfo {
    currentPage: number,
    nextPage: number,
}
