import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class ObjectContianerService {
    // private _CurrentObject: any;

    // get CurrentObject(): any {
    //     return this._CurrentObject;
    // }

    // set CurrentObject(value: any) {
    //     this._CurrentObject = JSON.parse(JSON.stringify(value));
    // }

    // private currentItemSource = new BehaviorSubject(null);
    // currentItem = this.currentItemSource.asObservable();

    constructor() { }

    // changeCurrentObject(item: any) {
    //     this.currentItemSource.next(item);
    // }
}
