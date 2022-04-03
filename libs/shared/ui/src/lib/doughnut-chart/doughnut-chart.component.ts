import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'readily-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent {
  @Input() view!: [number, number];

  @Input() showYAxis = true;
  @Input() showXAxis = true;
  @Input() gradient = false;
  @Input() showLegend = true;
  @Input() showXAxisLabel = true;
  @Input() xAxisLabel = 'Country';
  @Input() showYAxisLabel = true;
  @Input() yAxisLabel = 'Population';
  @Input() animations = true;
  @Input() tooltipText!: (series: {
    data: { label: string; value: unknown };
  }) => string;
  @Input() series: unknown[] = [];

  onSelect(event: unknown) {
    console.log(event);
  }
}
