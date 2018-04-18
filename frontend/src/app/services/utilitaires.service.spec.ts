import {inject, TestBed} from '@angular/core/testing';

import {UtilitairesService} from './utilitaires.service';

describe('UtilitairesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilitairesService]
    });
  });

  it('should be created', inject([UtilitairesService], (service: UtilitairesService) => {
    expect(service).toBeTruthy();
  }));
});
