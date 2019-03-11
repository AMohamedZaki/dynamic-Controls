
import { BaseElement } from './baseElement';
import { IElement } from './IElement';

// Supported events valueChange($event), filterChange($event), open(), close() ,focus(), blur()
export class MultiSelect extends BaseElement<any> {
    controlType = 'multiSelect';
    dataSource: string;
    textField: string;
    valueField: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
        this.textField = Options.textField || '';
        this.valueField = Options.valueField || '';
        this.position = Options.position;
    }
}


export class Calendar extends BaseElement<any> {
    controlType = 'calendar';
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.position = Options.position;
    }
}


export class KendoFileUpload extends BaseElement<any> {
    controlType = 'fileUpload';
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.position = Options.position;
    }
}
