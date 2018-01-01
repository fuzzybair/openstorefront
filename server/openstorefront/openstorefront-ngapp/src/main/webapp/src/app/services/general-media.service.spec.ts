import { TestBed, inject } from '@angular/core/testing';

import { GeneralMediaService } from './general-media.service';

describe('GeneralMediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralMediaService]
    });
  });

  it('should be created', inject([GeneralMediaService], (service: GeneralMediaService) => {
    expect(service).toBeTruthy();
  }));
});
