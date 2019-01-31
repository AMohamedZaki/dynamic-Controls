import { Injectable } from '@angular/core';
import { ObjectContianerService } from './ObjectContianer.service';

@Injectable()
export class DataService extends ObjectContianerService {

  Parent: ObjectContianerService = <ObjectContianerService>{};
  constructor() {
    super();
  }

  setParentReferance(obj: ObjectContianerService) {
    this.Parent = obj;
  }


}
