import { IEvent } from './IEvents';
import { Position } from './PositionEnum';
import { DateDetailsModel } from './dateDetails';
import { ValidationRoleBase } from './validation/ValidationRoleBase';

export interface IElement<T> {
    Key?: string;
    value?: T;
    Label?: string;
    validation?: ValidationRoleBase[];
    controlType?: string;
    visible?: boolean;
    readonly?: boolean;
    events?: IEvent[];
    id?: number;
    index?: number;
    position?: Position;
    style?: any;
    dateDetails?: DateDetailsModel;
    [key: string]: any;
}
