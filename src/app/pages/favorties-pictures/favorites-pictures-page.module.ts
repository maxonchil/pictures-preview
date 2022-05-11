import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesPicturesPageRoutingModule } from './favorites-pictures-page-routing.module';
import { FavoritesPicturePageComponent } from './favorites-picture-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [FavoritesPicturePageComponent],
    imports: [
        CommonModule,
        FavoritesPicturesPageRoutingModule,
        SharedModule,
    ],
})
export class FavoritesPicturesPageModule {}
