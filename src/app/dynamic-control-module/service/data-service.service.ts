import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { BaseElement } from '../model/baseElement';
import { ValidationRoleBase } from '../model/validation/ValidationRoleBase';
import { getValidators } from '../model/validation/ValidationHelper.service';


@Injectable()
export class DataService {
  private form: FormGroup;
  private _currentObject: any;
  private _ControlsValidators: { Name: string, Validators: ValidationRoleBase[] }[] = [];

  set CurrentObject(value: any) {
    if (value) { this._currentObject = value; }
  }

  get CurrentObject(): any {
    return this._currentObject.value;
  }

  private setValidators(propertyName: string, Validators: ValidatorFn | ValidatorFn[]) {
    this.form.get(propertyName).setValidators(Validators);
    this.form.get(propertyName).updateValueAndValidity();
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
  ApplyAllChange() {
    const CObject = Object.assign({}, this.CurrentObject);
    // tslint:disable-next-line:forin
    for (const key in this.form.controls) {
      if (key) {
        this.form.controls[key].setValue(CObject[key]);
        this.form.get(key).updateValueAndValidity();
      }
    }
  }

  /**
  * Apply The Change In Spacific Property
  */
  ApplyPropertyChange(PropertyName: string) {
    this.form.controls[PropertyName].setValue(this.CurrentObject[PropertyName]);
    this.form.get(PropertyName).updateValueAndValidity();
  }

  /**
  * Set Validation to Property And pass the Validations in array
  * if the Validtion exist it will not override the old one
  * but it will not saved in case of restoring validation
  */
  SetValidation(propertyName: string, _validators: ValidatorFn | ValidatorFn[]) {
    if (_validators) {
      let Validators: ValidatorFn | ValidatorFn[] = [];
      const OldValidation = this._ControlsValidators.find(item => item.Name === propertyName).Validators;
      if (OldValidation) {
        Validators = getValidators(OldValidation);
        if (_validators instanceof Array) {
          Validators.push(..._validators as ValidatorFn[]);
        } else {
          Validators.push(_validators);
        }
      } else { Validators = _validators; }

      this.setValidators(propertyName, Validators);
    }
  }

  /**
   * restore All old Validation after clear the existing one
   */
  restoreValidation(propertyName: string) {
    const OldValidation = this._ControlsValidators.find(item => item.Name === propertyName).Validators;
    const Validators = getValidators(OldValidation);

    this.form.get(propertyName).clearValidators();
    this.setValidators(propertyName, Validators);

  }

  SetValidationAndUpdateIfExist(propertyName: string, _newValidation: ValidationRoleBase[]) {
    let nValidation: ValidationRoleBase[] = [];
    const OldValidation = this._ControlsValidators.find(item => item.Name === propertyName).Validators;

    nValidation = [..._newValidation];

    const len = OldValidation.length;
    for (let i = 0; i < len; i++) {
      const item = OldValidation[i];
      const isExist = _newValidation.find(nv => nv.type === item.type);
      if (!isExist) {
        nValidation.push(OldValidation[i]);
      }
    }
    const Validators = getValidators(nValidation);
    this.setValidators(propertyName, Validators);
  }

  SetValidtors(controlsValue: BaseElement<any>[]) {
    controlsValue.forEach((control: BaseElement<any>) => {
      if (this._ControlsValidators && this._ControlsValidators.length === 0) {
        this._ControlsValidators.push({ Name: control.Key, Validators: control.validation });
      }
    });
  }

}
