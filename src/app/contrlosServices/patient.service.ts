import { DataService } from '../dynamic-control-module/service/data-service.service';
import { Validators } from '@angular/forms';

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
    { value: '3wad', key: 6 },
    { value: 'Ahmed1', key: 1 },
    { value: 'Ali2', key: 2 },
    { value: 'Zaki3', key: 3 },
    { value: 'Mohamed4', key: 4 },
    { value: 'Adraid5', key: 5 },
    { value: '3wad6', key: 6 }
  ];

  CityList = [];

  testClick() {
    // this.CurrentObject['lastName'] += 'ali';
   // this.SetValidation('', [Validators.required]);
    this.CurrentObject['lastName'] = this.CurrentObject['lastName'] + 'Test ';
    console.log('CurrentObject', this.CurrentObject);
    this.CurrentObject['IsAgree'] = true;
    // this.ChangeProprty('lastName');
    this.ApplyAllChange();
    // console.log('ali', this.CurrentObject['firstName']);
  }

  testChange() {
    this.CurrentObject['lastName'] += 'testChange';
  }

  btnClick() {
    this.CurrentObject['IsAgree'] = !this.CurrentObject['IsAgree'];
    this.ApplyPropertyChange('IsAgree');
    this.SetValidation('firstName', [Validators.maxLength(8)]);
  }

  btnRestore() {
    this.restoreValidation('firstName');
  }

  removeRequired() {
    this.SetValidationAndUpdateIfExist('firstName', {required: false});
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
