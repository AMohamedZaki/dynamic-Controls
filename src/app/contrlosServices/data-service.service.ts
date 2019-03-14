import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { CustomValidation } from '../model/Validation';
import { BaseElement } from '../model/baseElement';

@Injectable()
export class DataService {
  private form: FormGroup;
  private _currentObject: any;
  private _ControlsValidators: { Name: string, Validators: CustomValidation }[] = [];

  set CurrentObject(value: any) {
    if (value) { this._currentObject = value; }
  }

  get CurrentObject(): any {
    return this._currentObject.value;
  }

  /**
  * Add Reference of form Group of the panel
  */
  AddForm(form: FormGroup) {
    this.CurrentObject = this.form = form;
  }

  /**
  * Set Value Of Spacific Property and apply The Change in View
  */
  SetValue(propertyName: string, Value: any) {
    this.form.controls[propertyName].setValue(Value);
    this.form.get(propertyName).updateValueAndValidity();
  }

  /**
  * Get Value Of Spacific Property
  */
  getValue(propertyName: string) {
    return this.form.controls[propertyName].value;
  }

  /**
  * Apply All Changes in All Properties
  */
  ChangeAll() {
    const CObject = Object.assign({}, this.CurrentObject);
    // tslint:disable-next-line:forin
    for (const key in this.form.controls) {
      console.log(`${key}`, CObject[key]);
      if (key) {
        this.form.controls[key].setValue(CObject[key]);
        this.form.get(key).updateValueAndValidity();
      }
    }
  }

  /**
  * Apply The Change In Spacific Property
  */
  ChangeProprty(PropertyName: string) {
    this.form.controls[PropertyName].setValue(this.CurrentObject[PropertyName]);
    this.form.get(PropertyName).updateValueAndValidity();
  }

  /**
  * Remove All Property validation
  */
  RemoveAllPropertyValidation(PropertyName: string) {
    this.form.controls[PropertyName].clearValidators();
  }

  /**
  * Set Validation to Property And pass the Validations in array
  * And overwrite the existing similar ones
  */
  SetValidation(propertyName: string, validators: ValidatorFn | ValidatorFn[]) {

    const control = this.form.get('firstName');
    const controlValidators = control.validator({} as FormControl) as ValidationErrors;

    //   this.form.controls[propertyName].setValidators(validators);
    //   this.form.get(propertyName).updateValueAndValidity();
    // }

  }

  /**
 * Remove The Validation From Property
 */
  removeValidtion(propertyName: string, validators: ValidatorFn[]) {
    const control = this.form.get(propertyName);
    const validatorsList = control.validator;
  }


  getFormValidationErrors(propertyName: string) {
    const controlErrors: ValidationErrors = this.form.get(propertyName).errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {
        console.log('Key control: ' + propertyName + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
      });
    }
  }


  getFormValidationErrors2() {
    Object.keys(this.form.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  GetValidtors(controlsValue: BaseElement<any>[]) {
    controlsValue.forEach((control: BaseElement<any>) => {
      if (this._ControlsValidators && this._ControlsValidators.length === 0) {
        this._ControlsValidators.push({ Name: control.Key, Validators: control.validation });
      }
    });
  }
}
