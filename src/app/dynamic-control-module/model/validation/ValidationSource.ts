import { ValidationRoleBase } from './ValidationRoleBase';
import { ValidationRequired } from './ValidationRequired';
import { ValidationMaxLength } from './ValidationMaxLength';
import { ValidationMinLength } from './ValidationMinLength';

interface ValidationElement {
    [key: number]: ValidationRoleBase;
}


export function ValidationSource(): ValidationElement {
    const Validators: ValidationElement = <ValidationElement>{};

    const ValidationCollection: ValidationRoleBase[] = [
        new ValidationRequired(),
        new ValidationMaxLength(),
        new ValidationMinLength()];

    for (let i = 0; i < ValidationCollection.length; i++) {
        Validators[ValidationCollection[i].type] = ValidationCollection[i];
    }
    return Validators;
}

export function getNumber(): number {
    return 0;
}
