import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEmployeComponent } from './service-employe.component';

describe('ServiceEmployeComponent', () => {
  let component: ServiceEmployeComponent;
  let fixture: ComponentFixture<ServiceEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceEmployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
