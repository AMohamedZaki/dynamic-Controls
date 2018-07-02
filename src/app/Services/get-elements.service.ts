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
        events: [{ Name: 'click', callBack: () => this.elementConvertService.test() } ]
      }),

      new DropDown({
        Key: 'brave',
        Label: 'Choose One Answer ?',
        required: true,
        visible: false,
        id: 1,
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        events: [{ Name: 'change', callBack: el => {console.log( el.target.value ); } }]
      })
    ];

    return elemnents;

  }
}
