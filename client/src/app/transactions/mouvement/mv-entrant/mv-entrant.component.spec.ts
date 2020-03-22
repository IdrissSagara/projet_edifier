import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MvEntrantComponent} from './mv-entrant.component';

describe('MvEntrantComponent', () => {
  let component: MvEntrantComponent;
  let fixture: ComponentFixture<MvEntrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MvEntrantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvEntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
