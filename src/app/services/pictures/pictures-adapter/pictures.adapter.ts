import { Injectable } from '@angular/core';
import { Picture, PictureDto } from '../pictures.types';

@Injectable({
    providedIn: 'root',
})
export class PicturesAdapter {
    forward(pictures: PictureDto[], favoritesIds: string[]): Picture[] {
        console.log('favoritesIds', favoritesIds);
        const favoritesIdsMap: Record<string, string> = favoritesIds.reduce((memo, id: string) => ({...memo, [id]: id }), {});
        console.log('favoritesIdsMap', favoritesIdsMap);

        return pictures.map(({ id, urls}) => {
            return {
                id,
                url: urls.full,
                isFavorite: !!favoritesIdsMap[id],
            }
        });
    }
}
