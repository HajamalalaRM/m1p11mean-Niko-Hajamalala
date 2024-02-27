import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceManagerComponent } from './preference-manager.component';

describe('PreferenceManagerComponent', () => {
  let component: PreferenceManagerComponent;
  let fixture: ComponentFixture<PreferenceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferenceManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreferenceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
