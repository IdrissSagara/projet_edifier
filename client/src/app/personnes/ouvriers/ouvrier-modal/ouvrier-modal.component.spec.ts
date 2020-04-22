import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OuvrierModalComponent} from './ouvrier-modal.component';

describe('OuvrierModalComponent', () => {
  let component: OuvrierModalComponent;
  let fixture: ComponentFixture<OuvrierModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OuvrierModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuvrierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
