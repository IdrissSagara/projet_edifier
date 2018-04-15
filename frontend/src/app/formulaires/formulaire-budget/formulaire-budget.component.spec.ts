import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormulaireBudgetComponent} from './formulaire-budget.component';

describe('FormulaireBudgetComponent', () => {
  let component: FormulaireBudgetComponent;
  let fixture: ComponentFixture<FormulaireBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaireBudgetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
