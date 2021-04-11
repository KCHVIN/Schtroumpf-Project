import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilSchtroumpfComponent } from './profil-schtroumpf.component';

describe('ProfilSchtroumpfComponent', () => {
  let component: ProfilSchtroumpfComponent;
  let fixture: ComponentFixture<ProfilSchtroumpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilSchtroumpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilSchtroumpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
