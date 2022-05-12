import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LoaderComponent, PictureComponent } from './components';
import { PicturesListComponent } from '@shared/components';
import { EmptyComponent } from './components/empty/empty.component';
import { SkeletonComponent } from '@shared/components';

@NgModule({
    declarations: [
        PictureComponent,
        LoaderComponent,
        PicturesListComponent,
        EmptyComponent,
        SkeletonComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        MatButtonModule,
    ],
    exports: [
        MatButtonModule,
        PictureComponent,
        LoaderComponent,
        PicturesListComponent,
        EmptyComponent,
    ],
})
export class SharedModule {}
