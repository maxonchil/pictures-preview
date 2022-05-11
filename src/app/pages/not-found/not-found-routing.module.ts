import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmptyComponent } from '@shared/components/empty/empty.component';

const routes: Routes = [
    {
        path: '',
        component: EmptyComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotFoundRoutingModule {}
