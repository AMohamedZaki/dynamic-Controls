import { BaseElement } from './baseElement';


export interface Panel {
    title: string;
    elementList: BaseElement<any>[];
    Service?: string;
    panel?: Panel;
}
