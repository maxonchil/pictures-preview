import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Picture } from '../../../services/pictures';

@Component({
    selector: 'app-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureComponent {
    @Input() picture!: Picture;
    @Output() clicked = new EventEmitter<Picture>();
}
