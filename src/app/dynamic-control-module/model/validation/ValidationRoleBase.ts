import { ValidatorFn } from '@angular/forms';
import { ValidtionTypes } from './ValidtionTypes';

export class ValidationRoleBase {
    type: ValidtionTypes;
    value?: any | null;
    arg?: any | null;
    validate?(): ValidatorFn | void;
}
