
import { BaseElement } from './baseElement';
import { IElement } from './IElement';

// Supported events valueChange($event), filterChange($event), open(), close() ,focus(), blur()
export class MultiSelect extends BaseElement<any> {
    controlType = 'multiSelect';
    // options: { key: string, value: string, selected?: boolean };
    dataSource: string;
    textField: string;
    valueField: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
        this.textField = Options.textField || '';
        this.valueField = Options.valueField || '';
    }
}
