import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateFromPaypalComponent } from './donate-from-paypal.component';

describe('DonateFromPaypalComponent', () => {
  let component: DonateFromPaypalComponent;
  let fixture: ComponentFixture<DonateFromPaypalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateFromPaypalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateFromPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
