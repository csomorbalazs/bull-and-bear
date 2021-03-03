import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
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

  constructor(private playerInfoService: PlayerInfoService) { }

  ngOnInit(): void { }

  onMiniGameWon() {
    this.playerInfoService.increaseScoreBy(50);
    this.miniGameState = MiniGameState.WON;
  }

  onMiniGameLost() {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }


}
