import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormulaireMouvementSortantComponent} from './formulaire-mouvement-sortant.component';

describe('FormulaireMouvementSortantComponent', () => {
  let component: FormulaireMouvementSortantComponent;
  let fixture: ComponentFixture<FormulaireMouvementSortantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaireMouvementSortantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireMouvementSortantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
