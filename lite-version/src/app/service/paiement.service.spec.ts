import {TestBed} from '@angular/core/testing';

import {PaiementService} from './paiement.service';

describe('PaiementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaiementService = TestBed.get(PaiementService);
    expect(service).toBeTruthy();
  });

  it('should return all the paiements', async () => {
    const service: PaiementService = TestBed.get(PaiementService);
    let p: any[];
    p = await service.getAllPaiements();
    expect(p.length).toBeGreaterThan(0);
  });
});
