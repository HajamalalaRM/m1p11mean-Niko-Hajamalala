import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationEmployeComponent } from './notification-employe.component';

describe('NotificationEmployeComponent', () => {
  let component: NotificationEmployeComponent;
  let fixture: ComponentFixture<NotificationEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationEmployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
