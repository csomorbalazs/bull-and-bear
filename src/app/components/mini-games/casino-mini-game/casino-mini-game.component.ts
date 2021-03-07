import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { MiniGame } from '../mini-game';

@Component({
  selector: 'casino-mini-game',
  templateUrl: './casino-mini-game.component.html',
  styleUrls: ['./casino-mini-game.component.scss'],
})
export class CasinoMiniGameComponent implements OnInit, MiniGame {
  Character = Character;
  MiniGameState = MiniGameState;
  miniGameState: MiniGameState = MiniGameState.GAMEPLAY;
  lessonText: string;
  miniGameWonText: string =
    'Ügyes vagy! 🎉 Bár a kaszinózás izgalmasnak tűnhet, sok veszélyt rejt magában! A játékok úgy vannak kitalálva, hogy előbb-utóbb veszíts. Azzal, hogy nem fogadtál egyik színre sem, felelős döntést hoztál.';
  miniGameLostText: string =
    'Hoppá! Egy cselnek lettél az áldozata! A kaszinó játékai úgy vannak kitalálva, hogy előbb-utóbb veszíts. Így jobban jársz, ha nem fogadsz semmire! 😉';

  @Input() timeLimitInSeconds: number;
  @Input() reward: number;
  @Output() finished = new EventEmitter<void>();

  constructor(private playerInfoService: PlayerInfoService) {}

  ngOnInit(): void {}

  onMiniGameLost() {
    this.lessonText = this.miniGameLostText;
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }

  onMiniGameWon() {
    this.lessonText = this.miniGameWonText;
    this.playerInfoService.increaseScoreBy(this.reward);
    this.miniGameState = MiniGameState.WON;
  }
}
