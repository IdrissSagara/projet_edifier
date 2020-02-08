import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormulaireComponent } from './client-formulaire.component';

describe('ClientFormulaireComponent', () => {
  let component: ClientFormulaireComponent;
  let fixture: ComponentFixture<ClientFormulaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFormulaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
