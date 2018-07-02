import { BaseElement } from './baseElement';
import { IElement } from './IElement';

export class TextBoxElement extends BaseElement<any> {
    controlType = 'textbox';
    type: string;

    constructor(Options: IElement<string> = {}) {
        super(Options);
        this.type = Options.type || '';
    }
}
