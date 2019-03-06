import { IEvent } from './IEvents';
import { Position } from './PositionEnum';
import { ControlStyle } from './DynamicStyle';

export interface IElement<T> {
    Key?: string;
    value?: T;
    Label?: string;
    required?: boolean;
    controlType?: string;
    visible?: boolean;
    readonly?: boolean;
    events?: IEvent[];
    id?: number;
    index?: number;
    position?: Position;
    style?: ControlStyle;
    [key: string]: any;
}
