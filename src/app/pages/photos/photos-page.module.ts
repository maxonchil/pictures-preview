import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { PhotosPageComponent } from './photos-page.component';
import { PhotoItemGuard, PhotoModule } from '@modules/photos';
import { PhotosPageRoutingModule } from './photos-page-routing.module';

@NgModule({
    declarations: [PhotosPageComponent],
    imports: [
        CommonModule,
        PhotosPageRoutingModule,
        SharedModule,
        PhotoModule,
    ],
    providers: [PhotoItemGuard],
})
export class PhotosPageModule {}
