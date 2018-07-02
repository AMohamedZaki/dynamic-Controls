import { BaseElement } from './baseElement';
import { IElement } from './IElement';

export class TextBoxElement extends BaseElement<any> {
    controlType = 'textbox';

    constructor(Options: IElement = <IElement>{}) {
        super(Options);
    }
}
