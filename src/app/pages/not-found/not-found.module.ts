import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [CommonModule, NotFoundRoutingModule, SharedModule],
})
export class NotFoundModule {}
