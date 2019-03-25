import { ValidationRoleBase } from './ValidationRoleBase';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidtionTypes } from './ValidtionTypes';

export class ValidationMinLength extends ValidationRoleBase {
    type = ValidtionTypes.minLength;
    validate(): ValidatorFn {
        return Validators.minLength(this.value);
    }
}
