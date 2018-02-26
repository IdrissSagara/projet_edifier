import {inject, TestBed} from '@angular/core/testing';

import {ChantierService} from './chantier.service';

describe('ChantierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChantierService]
    });
  });

  it('should be created', inject([ChantierService], (service: ChantierService) => {
    expect(service).toBeTruthy();
  }));
});
