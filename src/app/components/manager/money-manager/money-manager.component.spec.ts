import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyManagerComponent } from './money-manager.component';

describe('MoneyManagerComponent', () => {
  let component: MoneyManagerComponent;
  let fixture: ComponentFixture<MoneyManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoneyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
