import { IEvent } from './IEvents';
import { Position } from './PositionEnum';
import { ControlStyle } from './DynamicStyle';
import { CustomValidation } from './Validation';
import { DateDetailsModel } from './dateDetails';

export interface IElement<T> {
    Key?: string;
    value?: T;
    Label?: string;
    validation?: CustomValidation;
    controlType?: string;
    visible?: boolean;
    readonly?: boolean;
    events?: IEvent[];
    id?: number;
    index?: number;
    position?: Position;
    style?: ControlStyle;
    dateDetails?: DateDetailsModel;
    [key: string]: any;
}
