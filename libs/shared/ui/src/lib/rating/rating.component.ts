import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

interface RatingContext {
  fill: number;
  index: number;
}

@Component({
  selector: 'readily-rating',
  templateUrl: './rating.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements OnInit {
  @Input() max = 5;

  @Input() rate: number | string = 0;

  ratingContexts: RatingContext[] = [];

  ngOnInit(): void {
    this.ratingContexts = Array.from({ length: this.max }, (v, k) => ({
      fill: 0,
      index: k,
    }));
    this._updateState(+this.rate);
  }

  private _updateState(nextValue: number) {
    this.ratingContexts = this.ratingContexts.map((context, index) => {
      context.fill = Math.round(
        this.getValueInRange(nextValue - index, 1, 0) * 100
      );
      return { ...context };
    });
    console.log(this.ratingContexts);
  }

  private getValueInRange(value: number, max: number, min = 0): number {
    return Math.max(Math.min(value, max), min);
  }
}
