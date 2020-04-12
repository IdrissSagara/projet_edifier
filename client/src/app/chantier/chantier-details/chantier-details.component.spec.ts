import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChantierDetailsComponent} from './chantier-details.component';

describe('ChantierDetailsComponent', () => {
  let component: ChantierDetailsComponent;
  let fixture: ComponentFixture<ChantierDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChantierDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
