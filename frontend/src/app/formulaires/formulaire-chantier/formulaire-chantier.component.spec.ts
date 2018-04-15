import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormulaireChantierComponent} from './formulaire-chantier.component';

describe('FormulaireChantierComponent', () => {
  let component: FormulaireChantierComponent;
  let fixture: ComponentFixture<FormulaireChantierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaireChantierComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
