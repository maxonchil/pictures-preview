import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesPicturesPageRoutingModule } from './favorites-pictures-page-routing.module';
import { FavoritesPicturePageComponent } from './favorites-picture-page.component';


@NgModule({
  declarations: [
    FavoritesPicturePageComponent
  ],
  imports: [
    CommonModule,
    FavoritesPicturesPageRoutingModule
  ]
})
export class FavoritesPicturesPageModule { }
