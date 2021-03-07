import { Component, EventEmitter, OnInit } from '@angular/core';
import { Apples } from 'src/app/models/Apples';
import { Character } from 'src/app/models/Character';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { getRandomIndices } from 'src/app/utils/randomizer';
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

  lessonText: String;

  finished: EventEmitter<void> = new EventEmitter<void>();
  timeLimitInSeconds: number;
  reward: number;

  constructor(private playerInfoService: PlayerInfoService) {}

  onTimesIsUp() {
    this.lessonText = 'Lejárt az időd! ⏰ Semmi gond, hamarosan újra próbálkozhatsz!';
    this.onMiniGameLost();
  }

  onMiniGameLost() {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }

  onMiniGameWon() {
    this.lessonText =
      'Ügyes vagy! 🎉 Jól felmérted, hogy melyik ajánlat a kedvezőbb. Azonban azt is mindig mérlegeld, hogy mennyire van szükséged!';
    this.playerInfoService.increaseScoreBy(this.reward);
    this.miniGameState = MiniGameState.WON;
  }

  onFirstApplesChosen() {
    if (this.firstApplesChoice.unitPrice > this.secondApplesChoice.unitPrice) {
      this.lessonText = `Lehet, hogy elsőre jobb ajánlatnak tűnt ${this.firstApplesChoice.numberOfApples} darab alma, viszont ha ${this.secondApplesChoice.numberOfApples} kerül a kosárba, darabonként olcsóbb. Azonban azt is mindig mérlegeld, hogy mennyire van szükséged!`;
      this.onMiniGameLost();
    } else {
      this.onMiniGameWon();
    }
  }

  onSecondApplesChosen() {
    if (this.firstApplesChoice.unitPrice < this.secondApplesChoice.unitPrice) {
      this.lessonText = `Lehet, hogy elsőre jobb ajánlatnak tűnt ${this.secondApplesChoice.numberOfApples} darab alma, viszont ha ${this.firstApplesChoice.numberOfApples} kerül a kosárba, darabonként olcsóbb.`;
      this.onMiniGameLost();
    } else {
      this.onMiniGameWon();
    }
  }

  ngOnInit(): void {
    this.apples = [
      new Apples('/assets/worth-it/one_apple.svg', 1, 60), //60
      new Apples('/assets/worth-it/two_apples.svg', 2, 110), // 50
      new Apples('/assets/worth-it/three_apples.svg', 3, 90), // 30
      new Apples('/assets/worth-it/four_apples.svg', 4, 280), // 70
      new Apples('/assets/worth-it/five_apples.svg', 5, 200), // 40
      new Apples('/assets/worth-it/six_apples.svg', 6, 120), // 20
    ];
    this.chooseApples();
  }

  chooseApples() {
    let randomIndices = getRandomIndices(this.apples.length);
    this.firstApplesChoice = this.apples[randomIndices[0]];
    this.secondApplesChoice = this.apples[randomIndices[1]];
  }
}
