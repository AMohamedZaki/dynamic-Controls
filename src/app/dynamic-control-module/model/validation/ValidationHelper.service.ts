import { ValidationSource } from './ValidationSource';
import { ValidationRoleBase } from './ValidationRoleBase';
import { ValidatorFn } from '@angular/forms';

export function getValidators(_validation: ValidationRoleBase[]): ValidatorFn[] {
  const validationList: any[] = [];
  const validationSource = ValidationSource();
  if (_validation) {
    const len = _validation.length;
    for (let i = 0; i < len; i++) {
      const type = _validation[i].type;
      const validationInstance = validationSource[type];
      // you can use  this line => ['arg', 'value'].forEach(prop => validationInstance[prop] = _validation[prop]);
      // instead of using obj. === obj.
      validationInstance.arg = _validation[i].arg;
      validationInstance.value = _validation[i].value;
      const validatior = validationInstance.validate();
      if (validatior) { validationList.push(validatior); }
    }
    return validationList;
  } else {
    return [];
  }
}
