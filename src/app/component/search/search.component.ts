import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementConvertService } from '../../Services/element-convert.service';
import { GetElementsService } from '../../Services/get-elements.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  length = 0;
  elementList: any[] = [];
  constructor(private elementConvertService: ElementConvertService,
    public elemntMockService: GetElementsService) {

  }

  ngOnInit() {
    this.elemntMockService.currentItems.subscribe(mockList => this.elementList = mockList.filter((item) => item['visible']) );

    if (this.elementList.length || this.elementList.length > 0) {
      this.length = this.elementList.length;
    }
    this.form = this.elementConvertService.toFormControl(this.elementList);
  }

  createRange(increment: number) {
    const remeder = (this.length % increment === 0) ? 0 : 1;
    const listLength = Math.floor(this.length / increment);
    const arrayLength = listLength + (remeder);
    return new Array(arrayLength);
  }

}
