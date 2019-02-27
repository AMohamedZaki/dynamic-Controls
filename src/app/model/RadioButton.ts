import { BaseElement } from './baseElement';
import { IElement } from './IElement';


export class Radiobuttons extends BaseElement<any> {
    controlType = 'Radiobuttons';
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
    }
}
