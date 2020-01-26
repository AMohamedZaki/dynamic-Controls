import { IEvent } from './IEvents';
import { Position } from './PositionEnum';
import { ValidationRoleBase } from './validation/ValidationRoleBase';
import { DateDetailsModel } from './dateDetails';

export class BaseElement<T> {
    public Key?: string;
    public value?: T;
    public Label?: string;
    public validation?: ValidationRoleBase[];
    public controlType?: any;
    public visible?: boolean;
    public readonly?: boolean;
    public events?: IEvent[];
    public id?: number;
    public index?: number;
    public position?: Position;
    public style?: any;
    public dateDetails?: DateDetailsModel;
    public nestedControls?: T;
    [key: string]: any;
}
