import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Panel } from '../model/panel';
import { Validation as CustomValidation } from '../model/Validation';

// export abstract class HelperService {

export function ConvertListToFormGroup(elements: Panel[]) {
  // const group: FormControl = <FormControl>{};
  const group: any = {};
  elements.forEach(controlElement => {

    const parentList = controlElement.elementList;

    if (parentList && parentList.length > 0) {
      group[controlElement.ObjectMap] = {};
      parentList.forEach(item => {
        const disable = item.readonly || false;
        const formControlObj = { value: item.value || '', disabled: disable };
        const validationList = getValidators(item.validation);

        group[controlElement.ObjectMap][item.Key] = new FormControl(formControlObj, validationList);
        if (item.readonly) { group[item.Key].disable(); }
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

// }


