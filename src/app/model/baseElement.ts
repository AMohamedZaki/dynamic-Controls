import { IElement } from './IElement';

export class BaseElement<T> {
    Key: string;
    value: string;
    Label: string;
    required: boolean;
    controlType: string;
    visible: boolean;

    constructor(options: IElement) {
        this.Key = options.Key || '';
        this.value = options.value || '';
        this.Label = options.Label || '';
        this.required = options.required;
        this.controlType = options.controlType || '';
        this.visible = options.visible ;
    }
}
