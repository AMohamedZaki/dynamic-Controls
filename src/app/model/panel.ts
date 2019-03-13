import { BaseElement } from './baseElement';

export interface Panel {
    title: string;
    ObjectMap: string;
    elementList: BaseElement<any>[];
    Service?: string;
    applySort?: boolean;
}
