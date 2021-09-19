import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'readily-vertical-bar-chart-normalized',
  templateUrl: './vertical-bar-chart-normalized.component.html',
  styleUrls: ['./vertical-bar-chart-normalized.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalBarChartNormalizedComponent {

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
  @Input() series: unknown[] = [];

  colorScheme: Color = {
    name: 'test',
    domain: ['#f08059', '#f8dcd2'],
    selectable: false,
    group: ScaleType.Linear
  };

  onSelect(event: unknown) {
    console.log(event);
  }

}
