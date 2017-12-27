import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandngPageFooterComponent } from './landng-page-footer.component';

describe('LandngPageFooterComponent', () => {
  let component: LandngPageFooterComponent;
  let fixture: ComponentFixture<LandngPageFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandngPageFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandngPageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
