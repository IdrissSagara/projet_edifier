import {inject, TestBed} from '@angular/core/testing';

import {FactureService} from './facture.service';

describe('FactureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactureService]
    });
  });

  it('should be created', inject([FactureService], (service: FactureService) => {
    expect(service).toBeTruthy();
  }));
});
