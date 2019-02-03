import { EventEmitter } from 'events';

export interface IEvent {
    Name: string ;
    callBack: string;
    mainObject?: boolean;
}
