import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesPicturePageComponent } from './favorites-picture-page.component';

const routes: Routes = [
    {
        path: '',
        component: FavoritesPicturePageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FavoritesPicturesPageRoutingModule {}
