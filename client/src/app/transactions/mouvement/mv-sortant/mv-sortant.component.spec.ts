import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MvSortantComponent} from './mv-sortant.component';

describe('MvSortantComponent', () => {
  let component: MvSortantComponent;
  let fixture: ComponentFixture<MvSortantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MvSortantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvSortantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
