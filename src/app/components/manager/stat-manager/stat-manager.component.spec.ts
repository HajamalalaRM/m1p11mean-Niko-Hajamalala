import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatManagerComponent } from './stat-manager.component';

describe('StatManagerComponent', () => {
  let component: StatManagerComponent;
  let fixture: ComponentFixture<StatManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
