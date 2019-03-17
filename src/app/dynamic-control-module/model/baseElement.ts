import { IElement } from './IElement';
import { IEvent } from './IEvents';
import { Position  } from './PositionEnum';
import { ControlStyle } from './DynamicStyle';
import { CustomValidation } from './Validation';

export class BaseElement<T> {

    Key: string;
    value: T;
    Label: string;
    validation: CustomValidation;
    controlType: string;
    visible?: boolean;
    events?: IEvent[];
    id?: number; // for checkBox visibal checkbox
    index?: number;
    position: Position ;
    style: ControlStyle;
    readonly: boolean;
    constructor(options: IElement<T>) {
        this.Key = options.Key || '';
        this.value = options.value;
        this.Label = options.Label || '';
        this.validation = options.validation;
        this.controlType = options.controlType || '';
        this.index = options.index || 0;
        this.events = options.events;
        this.visible = options.visible;
        this.id = options.id;
        this.position = options.position ;
        this.style = options.style || {};
        this.position = options.position || 4;
        this.readonly = options.readonly ;
    }
}
