import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/all-pictures/all-pictures-page.module').then((m) => m.AllPicturesPageModule),
    },
    {
        path: 'favorites',
        loadChildren: () => import('./pages/favorties-pictures/favorites-pictures-page.module').then((m) => m.FavoritesPicturesPageModule),
    },
    {
        path: 'photos',
        loadChildren: () => import('./pages/photos/photos-page.module').then((m) => m.PhotosPageModule),
    },
    {
        path: '**',
        loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),

    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
