import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  form: FormGroup;

  private _currentObject: any;
  set CurrentObject(value: any) {
    if (value) { this._currentObject = value; }
  }

  get CurrentObject(): any {
    return this._currentObject.value;
  }

  AddForm(form: FormGroup) {
    // this.CurrentObject = form;
    this.CurrentObject = this.form = form;
  }

  SetValue(propertyName: string, Value: any) {
    this.form.controls[propertyName].setValue(Value);
    this.form.get(propertyName).updateValueAndValidity();
  }

  getValue(propertyName: string) {
    return this.form.controls[propertyName].value;
  }

  ChangeAll() {
    console.log('DS', this.CurrentObject);
    const CObject = Object.assign({}, this.CurrentObject);

    // tslint:disable-next-line:forin
    for (const key in this.form.controls) {
      console.log(`${key}`, CObject[key]);
      if (key) {
        this.form.controls[key].setValue(CObject[key]);
        this.form.get(key).updateValueAndValidity();
      }
    }

    // console.log('ApplyChange', this.CurrentObject);
    // const Keys = Object.keys(this.form.controls);
    // Keys.forEach((key) => {
    //     console.log(key);
    //   this.form.controls[key].setValue(this.CurrentObject[key]);
    //   this.form.get(key).updateValueAndValidity();
    // });

  }

  ChangeProprty(PropertyName: string) {
    this.form.controls[PropertyName].setValue(this.CurrentObject[PropertyName]);
    this.form.get(PropertyName).updateValueAndValidity();
  }
}
