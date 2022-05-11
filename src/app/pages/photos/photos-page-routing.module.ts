import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoComponent, PhotoItemGuard } from '@modules/photos';

const routes: Routes = [
    {
        path: ':id',
        component: PhotoComponent,
        canActivate: [PhotoItemGuard],
    },
    {
        path: '**',
        redirectTo: '/not-found',
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhotosPageRoutingModule {}
