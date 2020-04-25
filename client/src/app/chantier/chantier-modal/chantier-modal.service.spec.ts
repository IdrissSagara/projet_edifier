import {TestBed} from '@angular/core/testing';
// @ts-ignore
import {ChantierModalService} from './chantier-modal.service';

describe('ChantierModalService', () => {
  let service: ChantierModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChantierModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
