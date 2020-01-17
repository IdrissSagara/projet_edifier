import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantierFormulaireComponent } from './chantier-formulaire.component';

describe('ChantierFormulaireComponent', () => {
  let component: ChantierFormulaireComponent;
  let fixture: ComponentFixture<ChantierFormulaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChantierFormulaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantierFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
