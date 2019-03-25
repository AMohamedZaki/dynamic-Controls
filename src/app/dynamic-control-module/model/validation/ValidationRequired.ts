import { ValidationRoleBase } from './ValidationRoleBase';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidtionTypes } from './ValidtionTypes';

export class ValidationRequired extends ValidationRoleBase {
    type = ValidtionTypes.required;
    validate(): ValidatorFn {
        if (this.value || this.value === true) {
            return Validators.required;
        } else { return null; }
    }
}
