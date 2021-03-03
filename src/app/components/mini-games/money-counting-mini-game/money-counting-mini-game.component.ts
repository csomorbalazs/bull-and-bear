import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MiniGame } from '../mini-game';

@Component({
  selector: 'money-counting-mini-game',
  templateUrl: './money-counting-mini-game.component.html',
  styleUrls: ['./money-counting-mini-game.component.scss']
})
export class MoneyCountingMiniGameComponent implements OnInit, MiniGame {
  money: number;

  @Output() onFinished = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void { }
}
