import { BaseElement } from './baseElement';
import { IElement } from './IElement';

export class DropDown extends BaseElement<any> {
    controlType = 'dropdown';
    options: { key: string, value: string };

    constructor(Options: {}= <IElement>{}) {
        super(Options);
    }

}
