import { IEvent } from './IEvents';

export interface IElement<T> {
    Key?: string;
    value?: T;
    Label?: string;
    required?: boolean;
    controlType?: string;
    visible?: boolean;
    events?: IEvent [];
    id?: number;
    [key: string]: any;
}
