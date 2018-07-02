import { BaseElement } from './baseElement';
import { IElement } from './IElement';

export class DropDown extends BaseElement<any> {
    controlType = 'dropdown';
    options: { key: string, value: string };

    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.options = Options.options || [];
    }

}
