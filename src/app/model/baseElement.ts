import { IElement } from './IElement';
import { IEvent } from './IEvents';
import { Position  } from './PositionEnum';
import { ControlStyle } from './DynamicStyle';

export class BaseElement<T> {

    Key: string;
    value: T;
    Label: string;
    required: boolean;
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
        this.required = options.required;
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
