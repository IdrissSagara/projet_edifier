import {inject, TestBed} from '@angular/core/testing';

import {PaiementService} from './paiement.service';

describe('PaiementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaiementService]
    });
  });

  it('should be created', inject([PaiementService], (service: PaiementService) => {
    expect(service).toBeTruthy();
  }));
});
