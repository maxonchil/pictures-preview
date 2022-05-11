import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './modules';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PicturesEffects, picturesReducer } from '@store/pictures';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FavoritesPicturesEffects, favoritesReducer } from '@store/favorites';
import { TokenInterceptor } from '@services/api';

@NgModule({
    declarations: [AppComponent],
    imports: [
        HeaderModule,
        BrowserModule,
        StoreModule.forRoot({ pictures: picturesReducer, favoritesPictures: favoritesReducer }),
        EffectsModule.forRoot([PicturesEffects, FavoritesPicturesEffects]),
        StoreDevtoolsModule.instrument(),
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
