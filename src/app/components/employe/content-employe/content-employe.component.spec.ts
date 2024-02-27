import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEmployeComponent } from './content-employe.component';

describe('ContentEmployeComponent', () => {
  let component: ContentEmployeComponent;
  let fixture: ComponentFixture<ContentEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentEmployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
