import { ValidationRoleBase } from './ValidationRoleBase';
import { ValidtionTypes } from './ValidtionTypes';
import { ValidatorFn, Validators } from '@angular/forms';

export class ValidationMaxLength extends ValidationRoleBase {
    type = ValidtionTypes.maxLength;
    validate(): ValidatorFn {
       return Validators.maxLength(this.value);
   }
}
