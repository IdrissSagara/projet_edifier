import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChantierModalComponent} from './chantier-modal.component';

describe('ChantierModalComponent', () => {
  let component: ChantierModalComponent;
  let fixture: ComponentFixture<ChantierModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChantierModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
