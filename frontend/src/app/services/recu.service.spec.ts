import {inject, TestBed} from '@angular/core/testing';

import {RecuService} from './recu.service';

describe('RecuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecuService]
    });
  });

  it('should be created', inject([RecuService], (service: RecuService) => {
    expect(service).toBeTruthy();
  }));
});
