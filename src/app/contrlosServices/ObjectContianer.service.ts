import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class ObjectContianerService {
    CurrentObject: any;

    private currentItemSource = new BehaviorSubject(null);
    currentItem = this.currentItemSource.asObservable();

    constructor() { }

    changeCurrentObject(item: any) {
        this.currentItemSource.next(item);
    }
}
