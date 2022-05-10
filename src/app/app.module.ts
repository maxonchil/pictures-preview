import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './modules';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PicturesEffects } from './store/pictures/pictures-store.effects';
import { picturesReducer } from './store/pictures/pictures-store.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { favoritesReducer } from './store/favorites/favorites-pictures-store.reducer';
import { FavoritesPicturesEffects } from './store/favorites/favorites-pictures-store.effects';

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
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
