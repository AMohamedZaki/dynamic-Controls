import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

export class MehtodesService {

  constructor() { }

  testClick() {
    console.log('from Service ');
  }

  testChange(event: any) {
    console.log('asdas');
  }

}
