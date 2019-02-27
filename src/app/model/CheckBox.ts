import { BaseElement } from './baseElement';
import { IElement } from './IElement';


export class CheckBox extends BaseElement<any> {
    controlType = 'CheckBox';
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
    }
}
