import {inject, TestBed} from '@angular/core/testing';

import {OuvrierService} from './ouvrier.service';

describe('OuvrierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OuvrierService]
    });
  });

  it('should be created', inject([OuvrierService], (service: OuvrierService) => {
    expect(service).toBeTruthy();
  }));
});
