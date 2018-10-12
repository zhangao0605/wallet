import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Process1Component } from './process1.component';

describe('Process1Component', () => {
  let component: Process1Component;
  let fixture: ComponentFixture<Process1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Process1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Process1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
