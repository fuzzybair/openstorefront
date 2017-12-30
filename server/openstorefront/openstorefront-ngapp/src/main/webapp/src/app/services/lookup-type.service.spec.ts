import { TestBed, inject } from '@angular/core/testing';

import { LookupTypeService } from './lookup-type.service';

describe('LookupTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookupTypeService]
    });
  });

  it('should be created', inject([LookupTypeService], (service: LookupTypeService) => {
    expect(service).toBeTruthy();
  }));
});
