import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationToolsComponent } from './evaluation-tools.component';

describe('EvaluationToolsComponent', () => {
  let component: EvaluationToolsComponent;
  let fixture: ComponentFixture<EvaluationToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
