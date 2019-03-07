import { Injectable } from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Panel } from '../model/panel';

@Injectable()
export class ElementConvertService {

  // Covert Elemnt To Form Control
  constructor() { }

  toFormControl(elements: Panel[]) {
    // const group: FormControl = <FormControl>{};
    const group: any = {};
    elements.forEach(controlElement => {

      const parentList = controlElement.elementList;
      const subParent = controlElement.panel || null;
      const subParentList = (subParent) ? controlElement.panel.elementList : [];

      if (parentList && parentList.length > 0) {
        group[controlElement.ObjectMap] = {};
        parentList.forEach(item => {
          const disable = item.readonly || false;
          const formControlObj = { value: item.value || '', disabled: disable };
          group[controlElement.ObjectMap][item.Key] = item.required ? new FormControl(formControlObj, Validators.required) :
            new FormControl(formControlObj);
          if (item.readonly) { group[item.Key].disable(); }
        });
      }

      // issue Here the sub panel in form group
      if (subParent && subParentList && subParentList.length > 0) {
        const subformPanel = group[controlElement.ObjectMap][subParent.ObjectMap] = {};
        subParentList.forEach(item => {
          const disable = item.readonly || false;
          const formControlObj = { value: item.value || '', disabled: disable };
          subformPanel[item.Key] = item.required ?
            new FormControl(formControlObj, Validators.required) : new FormControl(formControlObj);
        });
      }

      group[controlElement.ObjectMap] = new FormGroup(group[controlElement.ObjectMap]);
    });
    return new FormGroup(group);

  }
}
