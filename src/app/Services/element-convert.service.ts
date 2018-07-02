import { Injectable } from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ElementConvertService {

  // Covert Elemnt To Form Control
  constructor() { }

  toFormControl(contorls: BaseElement<any>[]) {
    const group: any = {};

    contorls.forEach(controlElement => {
      group[controlElement.Key] = controlElement.required ? new FormControl(controlElement.value || '', Validators.required)
                                              : new FormControl(controlElement.value || '');
    });
    return new FormGroup(group);

}

}
