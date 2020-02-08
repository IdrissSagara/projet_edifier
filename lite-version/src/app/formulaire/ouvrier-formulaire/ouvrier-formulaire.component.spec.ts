import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvrierFormulaireComponent } from './ouvrier-formulaire.component';

describe('OuvrierFormulaireComponent', () => {
  let component: OuvrierFormulaireComponent;
  let fixture: ComponentFixture<OuvrierFormulaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuvrierFormulaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuvrierFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
