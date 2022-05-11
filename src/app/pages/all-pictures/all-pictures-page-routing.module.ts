import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPicturesPageComponent } from './all-pictures-page.component';

const routes: Routes = [
    {
        path: '',
        component: AllPicturesPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AllPicturesPageRoutingModule {}
