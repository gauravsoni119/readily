import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBarChartNormalizedComponent } from './vertical-bar-chart-normalized.component';

describe('VerticalBarChartNormalizedComponent', () => {
  let component: VerticalBarChartNormalizedComponent;
  let fixture: ComponentFixture<VerticalBarChartNormalizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalBarChartNormalizedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalBarChartNormalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
