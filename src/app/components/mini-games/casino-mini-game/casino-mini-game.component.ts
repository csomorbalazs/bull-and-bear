import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { MiniGame } from '../mini-game';

@Component({
  selector: 'casino-mini-game',
  templateUrl: './casino-mini-game.component.html',
  styleUrls: ['./casino-mini-game.component.scss']
})
export class CasinoMiniGameComponent implements OnInit, MiniGame {
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

  ngOnInit(): void {
  }
}
