import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Panel } from '../dynamic-control-module/model/panel';
import {
  TextBoxElement, DropDown, CheckBox, Radiobuttons, FileUpload,
  Button, TextArea, DateDetails, TelephoneDetails
} from '../dynamic-control-module/model/Controls';
import { Position } from '../dynamic-control-module/model/PositionEnum';
import { MultiSelect, DatePicker, EditableDropdown } from '../dynamic-control-module/model/KendoControls';
import { DateDetailsModel } from '../dynamic-control-module/model/dateDetails';
import { ValidtionTypes } from '../dynamic-control-module/model/validation/ValidtionTypes';
import { TelephoneDetailsModel } from '../dynamic-control-module/model/telephoneDetails';
import { ControlType } from '../dynamic-control-module/model/controlsTypeEnum';


@Injectable()
export class GetElementsService {

  elemnents: Panel[];
  constructor() {
    this.elemnents = [{
      title: 'Patient',
      Service: 'patService',
      ObjectMap: 'Patient',
      applySort: false,
      expandPanel: false,
      elementList: [
        {
          controlType: ControlType[ControlType.textbox],
          Key: 'firstName',
          Label: 'First name',
          value: 'National Technology',
          validation: [{ type: ValidtionTypes.required, arg: '', value: true }],
          visible: true,
          index: 1,
          id: 0,
          position: Position.OneOfThree,
          events:
            [
              { Name: 'click', callBack: 'testClick' },
              { Name: 'change', callBack: 'testChange', PassEventObject: true }
            ]
        },
        {
          Key: 'Country',
          Label: 'Choose The Country',
          controlType: ControlType[ControlType.dropdown],
          validation: [{ type: ValidtionTypes.required }],
          visible: true,
          position: Position.OneOfThree,
          id: 3,
          index: 3,
          dataSource: 'CountryList',
          events:
            [
              { Name: 'change', callBack: 'ChangeCity', PassEventObject: true },
            ]
        },
        {
          controlType: ControlType[ControlType.checkBox],
          Key: 'IsAgree',
          Label: 'Agree With Terms',
          validation: [{ type: ValidtionTypes.required }],
          readonly: false,
          visible: true,
          position: Position.OneOfThree,
          id: 9,
          index: 5,
        },
        {
          controlType: ControlType[ControlType.radiobuttons],
          Key: 'CounRadio',
          Label: 'Choose Country',
          validation: [{ type: ValidtionTypes.required }],
          visible: true,
          position: Position.TwoOfThree,
          value: 'National Technology',
          id: 9,
          index: 6,
          dataSource: 'CountryRaddio'
        },
        {
          controlType: ControlType[ControlType.dropdown],
          Key: 'City',
          Label: 'Choose your City ?',
          validation: [{ type: ValidtionTypes.required }],
          visible: true,
          index: 4,
          position: Position.OneOfThree,
          dataSource: 'CityList',
          id: 4
        },
        {
          controlType: ControlType[ControlType.textbox],
          Key: 'lastName',
          Label: 'Last name',
          value: '',
          position: Position.OneOfThree,
          events:
            [
              { Name: 'keyup.enter', callBack: 'testClick' },
            ],
          validation: [{ type: ValidtionTypes.required }],
          visible: true,
          id: 2,
          index: 2,
          style: '{"width": "100%" }'
        },
        {
          controlType: ControlType[ControlType.button],
          Label: '',
          visible: true,
          id: 18,
          value: 'NewValidation',
          index: 13,
          position: Position.OneOfThree,
          style: '{"background-color": "red","font-size": "large","border": "2px solid red", "width": "100%"}',
          events:
            [
              { Name: 'click', callBack: 'btnClick' },
            ]
        },
        {
          controlType: ControlType[ControlType.multiSelect],
          Key: 'NamesMultiSelect',
          Label: 'Choose Names',
          visible: true,
          id: 3,
          index: 10,
          position: Position.OneOfThree,
          dataSource: 'NamesList',
          events:
            [
              { Name: 'change', callBack: 'ChangeCity', PassEventObject: true },
            ]
        },
        {
          controlType: ControlType[ControlType.button],
          Label: '',
          visible: true,
          id: 18,
          value: 'restoreFirstName',
          index: 13,
          position: Position.OneOfThree,
          events:
            [
              { Name: 'click', callBack: 'btnRestore' },
            ]
        },
        {
          controlType: ControlType[ControlType.button],
          Label: '',
          visible: true,
          id: 18,
          value: 'remove Required',
          index: 14,
          position: Position.OneOfThree,
          events:
            [
              { Name: 'click', callBack: 'removeRequired' },
            ]
        },
        {
          controlType: ControlType[ControlType.fileUpload],
          Label: 'Upload Image',
          Key: 'imageUpload',
          validation: [{ type: ValidtionTypes.required }],
          visible: true,
          id: 18,
          multiple: true,
          index: 20,
          position: Position.OneOfThree,
          events: [
            { Name: 'change', callBack: 'TestUpload', PassEventObject: true }
          ]
        },
        {
          controlType: ControlType[ControlType.textArea],
          Label: 'Summery',
          Key: 'Summery',
          visible: true,
          id: 63,
          index: 20,
          position: Position.ThreeOfThree
        },
        {
          controlType: ControlType[ControlType.editableDropdown],
          Label: 'Search',
          Key: 'Search',
          visible: true,
          id: 100,
          index: 100,
          position: Position.HalfOfThree,
          dataSource: 'SearchList',
          events: [{
            Name: 'keydown.enter',
            callBack: 'getItem'
          }]
        }
      ]
    }
      , {
      title: 'Doctor',
      ObjectMap: 'Doctor',
      Service: 'docService',
      expandPanel: false,
      elementList: [
        {
          controlType: ControlType[ControlType.textbox],
          Key: 'firstName',
          Label: 'First name',
          value: 'Abdel moneim Mohamed',
          validation: [{ type: ValidtionTypes.required }],
          visible: true,
          position: Position.TwoOfThree,
          id: 1,
          events:
            [
              { Name: 'click', callBack: 'testClick' },
              { Name: 'change', callBack: 'testChange', PassEventObject: true }
            ]
        }
        , {
          controlType: ControlType[ControlType.textbox],
          Key: 'lastName',
          Label: 'Last name',
          value: '',
          position: Position.OneOfThree,
          validation: [{ type: ValidtionTypes.required }],
          visible: true,
          id: 5,
        },
        {
          controlType: ControlType[ControlType.datePicker],
          Key: 'meeting',
          Label: 'Meeting',
          value: new Date(),
          validation: [{ type: ValidtionTypes.required }],
          visible: true,
          position: Position.OneOfThree,
          id: 10,
          format: 'dd-MMM-yyyy hh:mm'
        },
        {
          controlType: ControlType[ControlType.datePicker],
          Key: 'meeting2',
          Label: 'Meeting2',
          validation: [{ type: ValidtionTypes.required }],
          visible: true,
          position: Position.OneOfThree,
          id: 10,
          format: 'dd / MM / yyyy'
        },
        {
          controlType: ControlType[ControlType.dateDetails],
          Key: 'age',
          Label: 'Age',
          position: Position.OneOfThree,
          visible: true,
          index: 55,
          nestedControls: new DateDetailsModel()
        },
        {
          controlType: ControlType[ControlType.telephoneDetails],
          Key: 'Telephone',
          Label: 'Telephone',
          position: Position.HalfOfThree,
          visible: true,
          index: 55,
          nestedControls: { country: '', governorate: '', telephone: '' }
        }
      ]
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
