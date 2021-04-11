import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchtroumpfComponent } from './list-schtroumpf.component';

describe('ListSchtroumpfComponent', () => {
  let component: ListSchtroumpfComponent;
  let fixture: ComponentFixture<ListSchtroumpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSchtroumpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSchtroumpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
