import { IElement } from './IElement';
import { IEvent } from './IEvents';

export class BaseElement<T> {

    Key: string;
    value: T;
    Label: string;
    required: boolean;
    controlType: string;
    visible?: boolean;
    events?: IEvent [];
    id?: number; // for checkBox visibal checkbox
    constructor(options: IElement<T>) {
        this.Key = options.Key || '';
        this.value = options.value;
        this.Label = options.Label || '';
        this.required = options.required;
        this.controlType = options.controlType || '';
        this.events = options.events ;
        this.visible = options.visible ;
        this.id = options.id ;
    }
}
