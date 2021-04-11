import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSchtroumpfComponent } from './management-schtroumpf.component';

describe('ManagementSchtroumpfComponent', () => {
  let component: ManagementSchtroumpfComponent;
  let fixture: ComponentFixture<ManagementSchtroumpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementSchtroumpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementSchtroumpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
