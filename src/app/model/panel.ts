import { BaseElement } from './baseElement';


export interface Panel {
    titel: string;
    elementList: BaseElement<any>[];
    panel?: Panel[];
}
