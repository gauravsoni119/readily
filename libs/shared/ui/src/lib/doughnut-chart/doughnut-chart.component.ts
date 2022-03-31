import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'readily-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoughnutChartComponent implements OnInit {


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
  @Input() tooltipText!: (series: { data: { label: string, value: unknown } }) => string;
  @Input() series: unknown[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  colorScheme: Color = {
    name: 'test',
    domain: ['#f08059', '#f8dcd2', '#58b8b7'],
    selectable: false,
    group: ScaleType.Linear
  };

  onSelect(event: unknown) {
    console.log(event);
  }

}
