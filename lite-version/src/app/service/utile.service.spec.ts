import { TestBed } from '@angular/core/testing';

import { UtileService } from './utile.service';

describe('UtileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtileService = TestBed.get(UtileService);
    expect(service).toBeTruthy();
  });
});
