import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonColors, ButtonTypes } from './button.types';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
    @Input() text: string = 'Submit';
    @Input() type: string = ButtonTypes.Button;
    @Input() color: string = ButtonColors.Basic;
    @Output() clicked = new EventEmitter<MouseEvent>();

    ButtonTypes = ButtonTypes;

    constructor() { }

    ngOnInit(): void {
    }

}
