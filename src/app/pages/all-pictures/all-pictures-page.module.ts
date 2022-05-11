import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllPicturesPageRoutingModule } from './all-pictures-page-routing.module';
import { AllPicturesPageComponent } from './all-pictures-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        AllPicturesPageComponent,
    ],
    imports: [
        CommonModule,
        AllPicturesPageRoutingModule,
        SharedModule,
    ],
})
export class AllPicturesPageModule {}
