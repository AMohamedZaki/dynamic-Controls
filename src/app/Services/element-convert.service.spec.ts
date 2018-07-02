import { TestBed, inject } from '@angular/core/testing';

import { ElementConvertService } from './element-convert.service';

describe('ElementConvertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementConvertService]
    });
  });

  it('should be created', inject([ElementConvertService], (service: ElementConvertService) => {
    expect(service).toBeTruthy();
  }));
});
