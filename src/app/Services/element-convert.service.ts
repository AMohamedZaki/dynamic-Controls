import { Injectable } from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Panel } from '../model/panel';

@Injectable()
export class ElementConvertService {

  // Covert Elemnt To Form Control
  constructor() { }

  toFormControl(elements: Panel[]) {
    const group: any = {};

    elements.forEach(controlElement => {
      const parentList = controlElement.elementList;
      const subParent = controlElement.panel;
      const subParentList = controlElement.panel.elementList;

      if (parentList && parentList.length > 0 ) {
        parentList.forEach(item => {
          group[item.Key] = item.required ?
            new FormControl(item.value || '', Validators.required) : new FormControl(item.value || '');
          group[item.id] = new FormControl(item.id || '');
        });
      }

      if (subParent && subParentList && subParentList.length > 0 ) {
        subParentList.forEach(item => {
          group[item.Key] = item.required ?
            new FormControl(item.value || '', Validators.required) : new FormControl(item.value || '');
          group[item.id] = new FormControl(item.id || '');
        });
      }


    });
    return new FormGroup(group);

  }


  test() {
    console.log('from Service ');
  }

}
