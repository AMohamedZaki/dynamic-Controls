import { DataService } from './data-service.service';
import { AbstractControl, Validators, FormControl, ValidationErrors } from '@angular/forms';

export class PatientService extends DataService {

  constructor() {
    super();
  }

  CountryList = [
    { key: '1', value: 'Egypt', selected: true },
    { key: '2', value: 'Qeter', selected: false },
  ];

  CountryRaddio = [
    { key: 1, value: 'USA' },
    { key: 2, value: 'UK' },
  ];

  NamesList = [
    { value: 'Ahmed', key: 1 },
    { value: 'Ali', key: 2 },
    { value: 'Zaki', key: 3 },
    { value: 'Mohamed', key: 4 },
    { value: 'Adraid', key: 5 },
    { value: '3wad', key: 6 }
  ];

  CityList = [];

  testClick() {
    // this.CurrentObject['lastName'] += 'ali';
    this.SetValidation('', [Validators.required]);
    this.CurrentObject['lastName'] = this.CurrentObject['lastName'] + 'Test ';
    console.log('CurrentObject', this.CurrentObject);
    this.CurrentObject['IsAgree'] = true;
    // this.ChangeProprty('lastName');
    this.ChangeAll();
    // console.log('ali', this.CurrentObject['firstName']);
  }

  testChange(value: any) {
    this.CurrentObject['lastName'] += 'testChange';
  }

  btnClick() {
    this.SetValidation('firstName', [Validators.maxLength(3)]);
   // console.log(this.form.get('lastName'));
    this.CurrentObject['IsAgree'] = !this.CurrentObject['IsAgree'];

    this.getFormValidationErrors('firstName');
    // this.getFormValidationErrors2();

    // this.ChangeProprty('IsAgree');
    // this.form.get('lastName').updateValueAndValidity();
    // console.log(this.form);
    // this.ChangeAll();
  }

  ChangeCity(value: any) {
    const items = [
      { key: '1', value: 'Cairo', CountryId: '1' },
      { key: '2', value: 'Nasr', CountryId: '1' },
      { key: '3', value: 'Makka', CountryId: '2' },
      { key: '4', value: 'Madena', CountryId: '2' }
    ];
    this.CityList = items.filter((city: any) => city.CountryId === value.target.value);
  }

  TestUpload(event) {
    console.log('image', event);
    const file: File = event.target.files[0];
    console.log('file', file);
  }

}
