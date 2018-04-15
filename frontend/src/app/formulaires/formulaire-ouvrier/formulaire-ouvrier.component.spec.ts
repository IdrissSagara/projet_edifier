import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormulaireOuvrierComponent} from './formulaire-ouvrier.component';

describe('FormulaireOuvrierComponent', () => {
  let component: FormulaireOuvrierComponent;
  let fixture: ComponentFixture<FormulaireOuvrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaireOuvrierComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireOuvrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
