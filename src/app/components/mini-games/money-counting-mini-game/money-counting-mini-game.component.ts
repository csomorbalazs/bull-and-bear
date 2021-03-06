import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/models/Character';
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
  Character = Character;
  miniGameState: MiniGameState = MiniGameState.GAMEPLAY;

  targetMoney: number;

  @Input() timeLimitInSeconds;
  @Output() finished = new EventEmitter<void>();

  constructor(private playerInfoService: PlayerInfoService) { }

  ngOnInit(): void {
    this.targetMoney = this.getRandomNumberEndingWithFiveOrZero();
  }

  // generates number between 500 and 2000, ending with 5 or 0
  private getRandomNumberEndingWithFiveOrZero(): number {
    let max = 400;
    let min = 100;
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 5;
  }

  onCoinClicked(coinValue: number) {
    let result = this.targetMoney - coinValue;
    if (result < 0) {
      this.onMiniGameLost();
    } else if (result == 0) {
      this.onMiniGameWon();
    } else {
      this.targetMoney -= coinValue;
    }
  }

  onMiniGameLost() {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }

  onMiniGameWon() {
    this.playerInfoService.increaseScoreBy(50);
    this.miniGameState = MiniGameState.WON;
  }
}
