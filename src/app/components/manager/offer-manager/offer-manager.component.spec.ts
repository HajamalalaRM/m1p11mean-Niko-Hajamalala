import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferManagerComponent } from './offer-manager.component';

describe('OfferManagerComponent', () => {
  let component: OfferManagerComponent;
  let fixture: ComponentFixture<OfferManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
