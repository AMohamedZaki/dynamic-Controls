import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Panel } from '../model/panel';
import { TextBoxElement, DropDown, CheckBox, Radiobuttons } from '../model/Controls';
import { MultiSelect } from '../model/KendoControls';


@Injectable()
export class GetElementsService {

  elemnents: Panel[];
  constructor() {
    this.elemnents = [{
      title: 'Patient',
      Service: 'patService',
      ObjectMap: 'Patient',
      applySort: true,
      elementList: [
        new TextBoxElement({
          Key: 'firstName',
          Label: 'First name',
          value: 'National Technology',
          required: true,
          visible: true,
          index: 1,
          id: 0,
          events:
            [
              { Name: 'keyup.enter', callBack: 'testClick' },
              { Name: 'change', callBack: 'testChange', mainObject: true }
            ]
        }),
        new DropDown({
          Key: 'Country',
          Label: 'Choose The Country',
          required: false,
          visible: true,
          id: 3,
          index: 3,
          dataSource: 'CountryList',
          events:
            [
              { Name: 'change', callBack: 'ChangeCity', mainObject: true },
            ]
        }),
        new CheckBox({
          Key: 'IsAgree',
          Label: 'Agree With Terms',
          required: true,
          visible: true,
          id: 9,
          index: 5,
          // dataSource: 'CountryRaddio'
        }),
        new Radiobuttons({
          Key: 'CounRadio',
          Label: 'Choose Country',
          required: false,
          visible: true,
          value: 'National Technology',
          id: 9,
          index: 6,
          dataSource: 'CountryRaddio'
        }),
        new DropDown({
          Key: 'City',
          Label: 'Choose your City ?',
          required: false,
          visible: true,
          index: 4,
          dataSource: 'CityList',
          id: 4
        }),
        new TextBoxElement({
          Key: 'lastName',
          Label: 'Last name',
          value: '',
          required: true,
          visible: true,
          id: 2,
          index: 2
        }),
        new MultiSelect({
          Key: 'NamesMultiSelect',
          Label: 'Choose Names',
          required: false,
          visible: true,
          id: 3,
          index: 10,
          textField: 'name',
          valueField: 'value',
          dataSource: 'NamesList',
          events:
            [
              { Name: 'change', callBack: 'ChangeCity', mainObject: true },
            ]
        }),
      ]
      , panel: {
        title: 'pathology contnent',
        ObjectMap: 'PatientSub',
        elementList: [
          new TextBoxElement({
            Key: 'paragraph',
            Label: 'paragraph',
            value: '',
            required: false,
            visible: true,
            id: 0
          })
        ]
      }
    }
      , {
      title: 'Doctor',
      ObjectMap: 'Doctor',
      Service: 'docService',
      elementList: [
        new TextBoxElement({
          Key: 'doctorName',
          Label: 'First name',
          value: 'Abdel moneim Mohamed',
          required: true,
          visible: true,
          id: 1,
          events:
            [
              { Name: 'click', callBack: 'testClick' },
              { Name: 'change', callBack: 'testChange', mainObject: true }
            ]
        }),
        new TextBoxElement({
          Key: 'doctorlastName',
          Label: 'Last name',
          value: '',
          required: false,
          visible: true,
          id: 5,
        })
      ], panel: {
        title: 'Family Details',
        ObjectMap: 'SubDoctor',
        elementList: [
          new TextBoxElement({
            Key: 'FatherName',
            Label: 'Father Name',
            value: '',
            required: false,
            visible: true,
            id: 0
          })
        ]
      }
    }

    ];
  }

  private currentItemsSource = new BehaviorSubject<any[]>([]);
  currentItems = this.currentItemsSource.asObservable();

  changeCurrentItem(item: any) {
    this.currentItemsSource.next(item);
  }


  getElements() {
    return this.elemnents;

  }

  addElement(elemnents: Panel[]) {
    this.elemnents = this.assign(this.elemnents, elemnents);
  }

  assign(target, source): Panel[] {
    const num = Math.min(target.length, source.length);
    for (let i = 0; i < num; ++i) {
      target[i] = source[i];
    }
    return target;
  }
}
