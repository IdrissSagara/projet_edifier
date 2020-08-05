import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MouvementModalComponent} from './mouvement-modal.component';

describe('MouvementModalComponent', () => {
  let component: MouvementModalComponent;
  let fixture: ComponentFixture<MouvementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MouvementModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
