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
<<<<<<< HEAD
  message = '';
  index = 0;
<<<<<<< HEAD
  item = 4;
  showcheckbox = true;
=======
  showcheckbox: boolean;
>>>>>>> parent of 438f32d... test
  constructor(private elementConvertService: ElementConvertService,
    public elemntMockService: GetElementsService) {
=======
  constructor(private elementConvertService: ElementConvertService,
    private elemntMockService: GetElementsService) {

>>>>>>> parent of bac2306... apply an example for dynamic controls
  }

  ngOnInit() {
    this.sourceList = this.elemntMockService.getElements();
    // this.elementList = JSON.parse(JSON.stringify(this.sourceList));
     this.elementList = Object.create(this.sourceList);
    if (this.elementList.length || this.elementList.length > 0) {
      this.length = this.elementList.length;
    }
    this.form = this.elementConvertService.toFormControl(this.elementList);
  }

  onClick() {
<<<<<<< HEAD
    this.message = 'Done';
=======
    console.log(this.form.value);
>>>>>>> parent of bac2306... apply an example for dynamic controls
  }


  createRange(increment: number) {
    const remeder = (this.length  % increment === 0 ) ? 0 : 1 ;
    const listLength = Math.floor (this.length  / increment);
    const arrayLength = listLength + (remeder);
    console.log(arrayLength);
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
