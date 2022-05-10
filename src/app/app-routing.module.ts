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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
