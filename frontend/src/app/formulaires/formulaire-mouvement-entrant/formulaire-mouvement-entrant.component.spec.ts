import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormulaireMouvementEntrantComponent} from './formulaire-mouvement-entrant.component';

describe('FormulaireMouvementEntrantComponent', () => {
  let component: FormulaireMouvementEntrantComponent;
  let fixture: ComponentFixture<FormulaireMouvementEntrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaireMouvementEntrantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireMouvementEntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
