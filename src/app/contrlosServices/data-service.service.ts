import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  CurrentObject: any;
  form: FormGroup;

  ApplyChnage() {
    // tslint:disable-next-line:forin
    for (const key in this.form.controls) {
      const property = this.form.controls[key];
      this.form.controls[key].setValue(this.CurrentObject[key]);
      this.form.get(key).updateValueAndValidity();
    }
  }


  FormChange(): Observable<any> {
    if (this.form) {
      return this.form.valueChanges;
    }
    return new Observable<any>();
  }

}
