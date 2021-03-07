import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { MiniGame } from '../mini-game';

@Component({
  selector: 'mining-mini-game',
  templateUrl: './mining-mini-game.component.html',
  styleUrls: ['./mining-mini-game.component.scss'],
})
export class MiningMinigameComponent implements OnInit, MiniGame {
  MiniGameState = MiniGameState;
  Character = Character;
  miniGameState: MiniGameState = MiniGameState.GAMEPLAY;
  @ViewChild('pickaxe') pickaxe: ElementRef;

  clickTarget: number = 31;
  currentClicks: number = 0;

  currentMountainIndex: number;
  mountainUrls: String[] = [
    'assets/mining/mountain_1.svg',
    'assets/mining/mountain_2.svg',
    'assets/mining/mountain_3.svg',
    'assets/mining/mountain_3.svg',
    'assets/mining/mountain_4.svg',
    'assets/mining/mountain_5.svg',
    'assets/mining/mountain_6.svg',
    'assets/mining/mountain_7.svg',
    'assets/mining/mountain_8.svg',
    'assets/mining/mountain_9.svg',
    'assets/mining/mountain_10.svg',
    'assets/mining/mountain_11.svg',
    'assets/mining/mountain_12.svg',
    'assets/mining/mountain_13.svg',
    'assets/mining/mountain_14.svg',
    'assets/mining/mountain_15.svg',
    'assets/mining/mountain_16.svg',
  ];

  finished: EventEmitter<void> = new EventEmitter<void>();
  timeLimitInSeconds: number;
  reward: number;

  constructor(private playerInfoService: PlayerInfoService) {}

  ngOnInit(): void {
    this.currentMountainIndex = 0;
  }

  onMiniGameLost() {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }

  onMiniGameWon() {
    this.playerInfoService.increaseScoreBy(this.reward);
    this.miniGameState = MiniGameState.WON;
  }

  onClick() {
    this.currentClicks++;
    if (this.currentClicks % 2 === 1) {
      this.currentMountainIndex++;
    }
    if (this.currentClicks >= this.clickTarget) {
      this.onMiniGameWon();
    }
  }
}
