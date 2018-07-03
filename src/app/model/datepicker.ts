import { BaseElement } from './baseElement';
import { IElement } from './IElement';

export class DatePickerElement extends BaseElement<any> {
    controlType = 'datepicker';
    type: string;

    constructor(Options: IElement<string> = {}) {
        super(Options);
        this.type = Options.type || '';
    }
}
