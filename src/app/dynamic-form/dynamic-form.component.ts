import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementConvertService } from '../Services/element-convert.service';
import { GetElementsService } from '../Services/get-elements.service';
import { BaseElement } from '../model/baseElement';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

  form: FormGroup;
  length = 0;
  elementList: any[] = [];
  constructor(private elementConvertService: ElementConvertService,
    private elemntMockService: GetElementsService) {

  }

  ngOnInit() {
    this.elementList = this.elemntMockService.getElements();
    if (this.elementList.length || this.elementList.length > 0) {
      this.length = this.elementList.length;
    }
    this.form = this.elementConvertService.toFormControl(this.elementList);
  }

  onClick() {
    console.log(this.form.value);
  }


  createRange(increment: number) {
    const remeder = (this.length  % increment === 0 ) ? 0 : 1 ;
    const listLength = Math.floor (this.length  / increment);
    const arrayLength = listLength + (remeder);
    console.log(arrayLength);
    return new Array(arrayLength);
  }


}
