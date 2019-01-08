import { Injectable } from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Panel } from '../model/panel';

@Injectable()
export class ElementConvertService {

  // Covert Elemnt To Form Control
  constructor() { }

  toFormControl(contorls: Panel[]) {
    const group: any = {};
    console.log(contorls);
    contorls.forEach(controlElement => {
      controlElement.elementList.forEach(item => {
        group[item.Key] = item.required ?
          new FormControl(item.value || '', Validators.required) : new FormControl(item.value || '');
        group[item.id] = new FormControl(item.id || '');
      });
    });
    return new FormGroup(group);
  }


  test() {
    console.log('from Service ');
  }

}
