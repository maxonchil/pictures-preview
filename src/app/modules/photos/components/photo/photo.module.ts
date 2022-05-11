import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [PhotoComponent],
    imports: [CommonModule, SharedModule],
    exports: [PhotoComponent],
})
export class PhotoModule {}
