import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { MiniGame } from '../mini-game';

@Component({
  selector: 'money-counting-mini-game',
  templateUrl: './money-counting-mini-game.component.html',
  styleUrls: ['./money-counting-mini-game.component.scss'],
})
export class MoneyCountingMiniGameComponent implements OnInit, MiniGame {
  MiniGameState = MiniGameState;
  miniGameState: MiniGameState = MiniGameState.GAMEPLAY;

  @Input() timeLimitInSeconds;
  @Output() finished = new EventEmitter<void>();

  constructor(private playerInfoService: PlayerInfoService) {}

  ngOnInit(): void {}

  onMiniGameWon() {
    this.playerInfoService.increaseScoreBy(50);
    this.miniGameState = MiniGameState.WON;
  }

  onMiniGameLost() {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }

  onTimeIsUp() {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
    this.finished.emit();
  }
}
