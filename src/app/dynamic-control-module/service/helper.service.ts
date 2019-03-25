import { FormControl, FormGroup } from '@angular/forms';
import { Panel } from '../model/panel';
import { isBoolean } from 'util';
import { ControlType } from '../model/controlsTypeEnum';
import { getValidators } from '../model/validation/ValidationHelper.service';

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

export function IsNotNullorEmpty(property: any): boolean {
  if (isBoolean(property)) {
    return property != null && property !== undefined;
  }
  return property && property != null && property !== undefined;
}


