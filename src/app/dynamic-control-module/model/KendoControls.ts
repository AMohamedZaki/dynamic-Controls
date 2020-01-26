
import { BaseElement } from './baseElement';
import { IElement } from './IElement';
import { ControlType } from './controlsTypeEnum';

// Supported events valueChange($event), filterChange($event), open(), close() ,focus(), blur()
export class MultiSelect extends BaseElement<any> {
    controlType = ControlType[ControlType.multiSelect];
    dataSource: string;
    constructor() {
        super();
    }
}


export class DatePicker extends BaseElement<any> {
    controlType = ControlType[ControlType.datePicker];
    format: string;
    constructor() {
        super();
    }
}

export class EditableDropdown extends BaseElement<any> {
    controlType = ControlType[ControlType.editableDropdown];
    dataSource: string;
    constructor() {
        super();
    }
}
