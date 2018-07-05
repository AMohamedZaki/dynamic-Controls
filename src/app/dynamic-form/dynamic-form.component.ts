import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementConvertService } from '../Services/element-convert.service';
import { GetElementsService } from '../Services/get-elements.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

  form: FormGroup;
  length = 0;
  sourceList: any[] = [];
  elementList: any[] = [];
  message = '';
  index = 0;
  showcheckbox: boolean;
  constructor(private elementConvertService: ElementConvertService,
    public elemntMockService: GetElementsService) {
  }

  ngOnInit() {
    this.elemntMockService.getElements().forEach(item => {
      this.form = this.elementConvertService.toFormControl(item.elementList);
      // if (Object.keys(item.panel ).length > 0) {
      //   this.form.addControl(this.elementConvertService.toFormControl(item.panel.elementList));
      // }
    });

    this.sourceList = this.elemntMockService.getElements();
    this.elementList = JSON.parse(JSON.stringify(this.sourceList));

    if (this.elementList.length || this.elementList.length > 0) {
      this.length = this.elementList.length;
    }
  }

  onClick() {
    this.message = 'Done';
  }


  createRange(increment: number, length: number) {
    const remeder = (length % increment === 0) ? 0 : 1;
    const listLength = Math.floor(length / increment);
    const arrayLength = listLength + (remeder);
    return new Array(arrayLength);
  }

  applyChange() {
    // show checkbox
    if (this.index % 2 === 0) {
      this.showcheckbox = true;
      this.elementList = JSON.parse(JSON.stringify(this.sourceList));
    } else {
      // apply change
      this.sourceList = JSON.parse(JSON.stringify(this.elementList));
      this.showcheckbox = false;
    }
    this.index += 1;
  }

  getSelectedDate() {
    this.elementList = JSON.parse(JSON.stringify(this.sourceList.filter(item => item.visible)));
  }

}
