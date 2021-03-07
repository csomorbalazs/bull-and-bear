import { Component, EventEmitter, OnInit } from '@angular/core';
import { Apples } from 'src/app/models/Apples';
import { Character } from 'src/app/models/Character';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { MiniGame } from '../mini-game';

@Component({
  selector: 'worth-it-minigame',
  templateUrl: './worth-it-minigame.component.html',
  styleUrls: ['./worth-it-minigame.component.scss'],
})
export class WorthItMinigameComponent implements OnInit, MiniGame {
  MiniGameState = MiniGameState;
  Character = Character;
  miniGameState: MiniGameState = MiniGameState.GAMEPLAY;
  private apples: Apples[];
  firstApplesChoice: Apples;
  secondApplesChoice: Apples;

  finished: EventEmitter<void> = new EventEmitter<void>();
  timeLimitInSeconds: number;
  reward: number;

  constructor(private playerInfoService: PlayerInfoService) {}

  onMiniGameLost() {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }

  onMiniGameWon() {
    this.playerInfoService.increaseScoreBy(this.reward);
    this.miniGameState = MiniGameState.WON;
  }

  onFirstApplesChosen() {
    if (this.firstApplesChoice.unitPrice > this.secondApplesChoice.unitPrice) {
      this.onMiniGameLost();
    } else {
      this.onMiniGameWon();
    }
  }

  onSecondApplesChosen() {
    if (this.firstApplesChoice.unitPrice < this.secondApplesChoice.unitPrice) {
      this.onMiniGameLost();
    } else {
      this.onMiniGameWon();
    }
  }

  ngOnInit(): void {
    this.apples = [
      new Apples('/assets/worth-it/one_apple.svg', 1, 60), //60
      new Apples('/assets/worth-it/two_apples.svg', 2, 110), // 55
      new Apples('/assets/worth-it/three_apples.svg', 3, 105), // 35
      new Apples('/assets/worth-it/four_apples.svg', 4, 200), // 50
      new Apples('/assets/worth-it/five_apples.svg', 5, 225), // 45
      new Apples('/assets/worth-it/six_apples.svg', 6, 240), // 40
    ];
    this.chooseApples();
  }

  chooseApples() {
    this.firstApplesChoice = this.apples[Math.floor(Math.random() * this.apples.length)];
    this.secondApplesChoice = this.apples[Math.floor(Math.random() * this.apples.length)];
    if (this.firstApplesChoice === this.secondApplesChoice) {
      this.chooseApples();
    }
  }
}
