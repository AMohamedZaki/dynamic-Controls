import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Panel } from '../model/panel';
import { CustomValidation } from '../model/Validation';
import { isBoolean } from 'util';
import { ControlType } from '../model/controlsTypeEnum';

// export abstract class HelperService {

export function ConvertListToFormGroup(elements: Panel[]) {
  // const group: FormControl = <FormControl>{};
  const group: any = {};
  elements.forEach(controlElement => {

    const parentList = controlElement.elementList;

    if (parentList && parentList.length > 0) {
      group[controlElement.ObjectMap] = {};
      parentList.forEach(item => {
        if (item.controlType !== ControlType[ControlType.button] && item.Key) {
          const disable = item.readonly || false;
          const formControlObj = { value: item.value || '', disabled: disable };
          const validationList = getValidators(item.validation);
          const haveNestedPropertois = (item.nestedControls) ? Object.keys(item.nestedControls) : null;

          if (haveNestedPropertois && haveNestedPropertois.length > 1) {
            group[controlElement.ObjectMap][item.Key] = {};
            haveNestedPropertois.forEach(key => {
              group[controlElement.ObjectMap][item.Key][key] = new FormControl('');
            });
            group[controlElement.ObjectMap][item.Key] = new FormGroup(group[controlElement.ObjectMap][item.Key]);
          } else { group[controlElement.ObjectMap][item.Key] = new FormControl(formControlObj, validationList); }
        }
      });
    }
    group[controlElement.ObjectMap] = new FormGroup(group[controlElement.ObjectMap]);
  });
  return new FormGroup(group);

}

export function getValidators(_validation: CustomValidation): ValidatorFn[] {
  const validationList: any[] = [];
  if (_validation) {
    if (_validation.required) { validationList.push(Validators.required); }
    if (_validation.maxLength) { validationList.push(Validators.maxLength(_validation.maxLength)); }
    if (_validation.minLength) { validationList.push(Validators.minLength(_validation.minLength)); }
    if (_validation.pattern) {
      const pattern = RegExp(_validation.pattern);
      validationList.push(Validators.pattern(pattern));
    }
    return validationList;
  } else {
    return [];
  }
}


export function GetObjectNames<T>(obj: T): string[] {
  const objectKeys = Object.keys(obj) as Array<string>;
  return objectKeys;
}


export function IsNotNullorEmpty(property: any): boolean {
  if (isBoolean(property)) {
    return property != null && property !== undefined;
  }
  return property && property != null && property !== undefined;
}


