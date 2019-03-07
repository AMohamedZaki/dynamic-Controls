import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Panel } from '../model/panel';
import {
  TextBoxElement, DropDown, CheckBox,
  Radiobuttons, TextArea
  , Button as button
} from '../model/Controls';
import { MultiSelect, Calendar } from '../model/KendoControls';
import { Position } from '../model/PositionEnum';


@Injectable()
export class GetElementsService {

  elemnents: Panel[];
  constructor() {
    this.elemnents = [{
      title: 'Patient',
      Service: 'patService',
      ObjectMap: 'Patient',
      applySort: false,
      elementList: [
        new TextBoxElement({
          Key: 'firstName',
          Label: 'First name',
          value: 'National Technology',
          required: true,
          visible: true,
          index: 1,
          id: 0,
          position: Position.OneOfThree,
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
          position: Position.OneOfThree,
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
          readonly: false,
          visible: true,
          position: Position.OneOfThree,
          id: 9,
          index: 5,
          // dataSource: 'CountryRaddio'
        }),
        new Radiobuttons({
          Key: 'CounRadio',
          Label: 'Choose Country',
          required: false,
          visible: true,
          position: Position.TwoOfThree,
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
          position: Position.OneOfThree,
          dataSource: 'CityList',
          id: 4
        }),
        new TextBoxElement({
          Key: 'lastName',
          Label: 'Last name',
          value: '',
          position: Position.HalfOfThree,
          events:
          [
            { Name: 'keyup.enter', callBack: 'testClick' },
          ],
          required: true,
          visible: true,
          id: 2,
          index: 2,
          style: { 'width': '100px' }
        }),
        new MultiSelect({
          Key: 'NamesMultiSelect',
          Label: 'Choose Names',
          required: false,
          visible: true,
          id: 3,
          index: 10,
          position: Position.HalfOfThree,
          textField: 'name',
          valueField: 'value',
          dataSource: 'NamesList',
          events:
            [
              { Name: 'change', callBack: 'ChangeCity', mainObject: true },
            ]
        }),
        new button({
          Label: '',
          required: false,
          visible: true,
          id: 18,
          value: 'Agree!',
          index: 13,
          position: Position.OneOfThree,
          style: {
            'background-color': 'red',
            'font-size': 'large',
            border: '2px solid red',
            width: '100%'
          },
          events:
            [
              { Name: 'click', callBack: 'btnClick' },
            ]
        })
      ]
      // , panel: {
      //   title: 'pathology contnent',
      //   ObjectMap: 'PatientSub',
      //   elementList: [
      //     new TextArea({
      //       Key: 'paragraph',
      //       Label: 'paragraph',
      //       value: '',
      //       position: Position.ThreeOfThree,
      //       style: { width: '50%' },
      //       required: false,
      //       visible: true,
      //       id: 0
      //     })
      //   ]
      // }
    }
      // , {
      //   title: 'Doctor',
      //   ObjectMap: 'Doctor',
      //   Service: 'docService',
      //   elementList: [
      //     new TextBoxElement({
      //       Key: 'doctorName',
      //       Label: 'First name',
      //       value: 'Abdel moneim Mohamed',
      //       required: true,
      //       visible: true,
      //       position: Position.TwoOfThree,
      //       id: 1,
      //       events:
      //         [
      //           { Name: 'click', callBack: 'testClick' },
      //           { Name: 'change', callBack: 'testChange', mainObject: true }
      //         ]
      //     })
      //     , new TextBoxElement({
      //       Key: 'doctorlastName',
      //       Label: 'Last name',
      //       value: '',
      //       position: Position.OneOfThree,
      //       required: false,
      //       visible: true,
      //       id: 5,
      //     }),
      //     new Calendar({
      //       Key: 'meeting',
      //       Label: 'Meeting',
      //       value: '',
      //       required: true,
      //       visible: true,
      //       position: Position.TwoOfThree,
      //       id: 10,
      //     })
      //   ]
      //   , panel: {
      //     title: 'Family Details',
      //     ObjectMap: 'SubDoctor',
      //     elementList: [
      //       new TextBoxElement({
      //         Key: 'FatherName',
      //         Label: 'Father Name',
      //         value: '',
      //         required: false,
      //         position: Position.TwoOfThree,
      //         visible: true,
      //         id: 0
      //       })
      //     ]
      //   }
      // }
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
