import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'readily-premium-card',
  templateUrl: './premium-card.component.html',
  styleUrls: ['./premium-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PremiumCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
