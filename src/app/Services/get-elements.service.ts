import { Injectable } from '@angular/core';
import { TextBoxElement } from '../model/TextBoxElement';
import { DropDown } from '../model/dropDown';
import { EventEmitter } from 'events';
import { ElementConvertService } from './element-convert.service';

@Injectable()
export class GetElementsService {

  constructor(private elementConvertService: ElementConvertService) { }

  getElements() {
    const elemnents: any[] = [

      new TextBoxElement({
        Key: 'firstName',
        Label: 'First name',
        value: 'National Technology',
        required: true,
        visible: true,
        id: 0,
        events:
          [
            { Name: 'click', callBack: () => { this.elementConvertService.test(); } },
            { Name: 'change', callBack: el => { console.log(el.target.value); } }
          ]
      }),

      new DropDown({
        Key: 'country',
        Label: 'Choose Your Country ?',
        required: true,
        visible: false,
        id: 1,
        options: [
          { key: 'egypt', value: 'Egypt' },
          { key: 'qeter', value: 'Qeter' },
          { key: 'aswan', value: 'Aswan' },
          { key: 'enpi', value: 'Enpi' }
        ]
      }),

      new TextBoxElement({
        Key: 'lastName',
        Label: 'Last name',
        value: 'Zaki',
        required: true,
        visible: false,
        id: 3
      }),

      new DropDown({
        Key: 'City',
        Label: 'Choose your City ?',
        required: true,
        visible: false,
        id: 4,
        options: [
          { key: 'cairo', value: 'Cairo' },
          { key: 'nasr', value: 'Nasr' },
          { key: 'helwan', value: 'Helwan' },
          { key: 'zagazeg', value: 'Zagazeg' }
        ]
      }),


    ];

    return elemnents;

  }
}
