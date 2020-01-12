import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortantComponent } from './sortant.component';

describe('SortantComponent', () => {
  let component: SortantComponent;
  let fixture: ComponentFixture<SortantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
