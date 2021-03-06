import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Picture } from '@services/pictures';

@Component({
    selector: 'app-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureComponent {
    @Input() picture!: Picture;
    @Input() isLoading!: boolean;
    @Input() clickDisabled?: boolean = false;
    @Output() clicked = new EventEmitter<Picture>();
    isLoaded = false;

    onImageLoad(): void {
        this.isLoaded = true;
    }
}
