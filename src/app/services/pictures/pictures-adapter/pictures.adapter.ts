import { Injectable } from '@angular/core';
import { Picture, PictureDto } from '../pictures.types';

@Injectable({
    providedIn: 'root',
})
export class PicturesAdapter {
    forward(pictures: PictureDto[], favoritesMap: Record<string, Picture>): Picture[] {
        return pictures.map(({ id, urls }) => {
            return {
                id,
                url: urls.full,
                isFavorite: !!favoritesMap[id],
            };
        });
    }
}
