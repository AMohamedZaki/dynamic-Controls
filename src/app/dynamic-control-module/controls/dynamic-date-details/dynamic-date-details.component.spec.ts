import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDateDetailsComponent } from './dynamic-date-details.component';

describe('DynamicDateDetailsComponent', () => {
  let component: DynamicDateDetailsComponent;
  let fixture: ComponentFixture<DynamicDateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
