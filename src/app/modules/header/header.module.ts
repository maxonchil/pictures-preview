import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [RouterModule, SharedModule],
})
export class HeaderModule {}
