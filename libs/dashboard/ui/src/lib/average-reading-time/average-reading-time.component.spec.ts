import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageReadingTimeComponent } from './average-reading-time.component';

describe('AverageReadingTimeComponent', () => {
  let component: AverageReadingTimeComponent;
  let fixture: ComponentFixture<AverageReadingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageReadingTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageReadingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
