import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent, PictureComponent } from './components';

@NgModule({
    declarations: [
        ButtonComponent,
        PictureComponent,
        LoaderComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        MatButtonModule,
    ],
    exports: [
        ButtonComponent,
        MatButtonModule,
        PictureComponent,
        LoaderComponent,
    ],
})
export class SharedModule {}
