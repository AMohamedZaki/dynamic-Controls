import { TestBed, inject } from '@angular/core/testing';

import { GetElementsService } from './get-elements.service';

describe('GetElementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetElementsService]
    });
  });

  it('should be created', inject([GetElementsService], (service: GetElementsService) => {
    expect(service).toBeTruthy();
  }));
});
