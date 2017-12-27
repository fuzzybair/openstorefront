import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandngPageHeaderComponent } from './landng-page-header.component';

describe('LandngPageHeaderComponent', () => {
  let component: LandngPageHeaderComponent;
  let fixture: ComponentFixture<LandngPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandngPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandngPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
