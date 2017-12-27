import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntryComponent } from './admin-entry.component';

describe('AdminEntryComponent', () => {
  let component: AdminEntryComponent;
  let fixture: ComponentFixture<AdminEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
