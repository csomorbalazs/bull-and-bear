import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { MiniGame } from '../mini-game';

@Component({
  selector: 'money-counting-mini-game',
  templateUrl: './money-counting-mini-game.component.html',
  styleUrls: ['./money-counting-mini-game.component.scss']
})
export class MoneyCountingMiniGameComponent implements OnInit, MiniGame {
  MiniGameState = MiniGameState;
  miniGameState: MiniGameState = MiniGameState.GAMEPLAY;

  @Output() onFinished = new EventEmitter<void>();

  onMiniGameWon() {
    this.miniGameState = MiniGameState.WON;
  }

  onMiniGameLost() {
    this.miniGameState = MiniGameState.LOST;
  }

  constructor() {
  }

  ngOnInit(): void { }
}
