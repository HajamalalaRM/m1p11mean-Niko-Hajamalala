import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceEmployeComponent } from './preference-employe.component';

describe('PreferenceEmployeComponent', () => {
  let component: PreferenceEmployeComponent;
  let fixture: ComponentFixture<PreferenceEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferenceEmployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreferenceEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
