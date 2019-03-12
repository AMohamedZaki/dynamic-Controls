import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Panel } from '../model/panel';
import { Validation as CustomValidation } from '../model/Validation';

// export abstract class HelperService {

export function ConvertListToFormGroup(elements: Panel[]) {
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
        const validationList = getValidators(item.validation);

        group[controlElement.ObjectMap][item.Key] = new FormControl(formControlObj, validationList);
        if (item.readonly) { group[item.Key].disable(); }
      });
    }
    // issue Here the sub panel in form group
    if (subParent && subParentList && subParentList.length > 0) {
      const subPanel = group[controlElement.ObjectMap][subParent.ObjectMap] = {};
      subParentList.forEach(item => {
        const disable = item.readonly || false;
        const formControlObj = { value: item.value || '', disabled: disable };
        const validationList = getValidators(item.validation);
        // group[controlElement.ObjectMap][subParent.ObjectMap][item.Key] = new FormControl(formControlObj, validationList);
        subPanel[item.Key] = new FormControl(formControlObj, validationList);
      });
      group[controlElement.ObjectMap][subParent.ObjectMap] = new FormGroup(subPanel);
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


