import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { Garbage } from 'src/app/models/Garbage';
import { GarbageType } from 'src/app/models/GarbageType';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { startsWithVowel } from 'src/app/utils/startsWithVowel';
import { getRandomIndices } from 'src/app/utils/randomizer';
import { MiniGame } from '../mini-game';

@Component({
  selector: 'recycling',
  templateUrl: './recycling.component.html',
  styleUrls: ['./recycling.component.scss']
})
export class RecyclingComponent implements OnInit, MiniGame {
  MiniGameState = MiniGameState;
  Character = Character;
  GarbageType = GarbageType;
  miniGameState: MiniGameState = MiniGameState.GAMEPLAY;

  @Output() finished: EventEmitter<void> = new EventEmitter<void>();
  @Input() timeLimitInSeconds: number;
  @Input() reward: number;
  lessonText: string;

  private miniGameWonText = "Szép munka! Mindig a megfelelő szemetesbe dobd a hulladékot, ezzel is véded a környezeted. 🌍";
  private defaultLostText = "Ajjajj, lejárt az időd! ⌛ Mindig figyelj a szelektív hulladékgyűjtésre, hiszen ezzel is véded a környezeted. 🌍";

  private getMinigameLostText(garbage: Garbage) {
    return `Ajjajj! 😬 Ez a${startsWithVowel(garbage.name) ? 'z' : ''} ${garbage.name} igazából a ${garbage.type} hulladékba való. Figyelj jobban a szelektív hulladékgyűjtésre!`;
  }

  private garbageOptions: Garbage[] = [
    new Garbage(GarbageType.PAPER, "assets/recycling/cardboard.svg", "papírdoboz"),
    new Garbage(GarbageType.PAPER, "assets/recycling/newspaper.svg", "újságpapír"),
    new Garbage(GarbageType.PLASTIC, "assets/recycling/bag.svg", "műanyag zacskó"),
    new Garbage(GarbageType.PLASTIC, "assets/recycling/plastic-bottle.svg", "műanyag flakon"),
    new Garbage(GarbageType.GLASS, "assets/recycling/glass-bottle.svg", "sörös üveg"),
    new Garbage(GarbageType.GLASS, "assets/recycling/broken-glass-bottle.svg", "törött sörös üveg"),
  ];

  garbages: Garbage[];

  constructor(private playerInfoService: PlayerInfoService) { }

  ngOnInit(): void {
    this.garbages = getRandomIndices(this.garbageOptions.length)
      .map(i => this.garbageOptions[i])
      .slice(0, 3);
  }

  onMiniGameWon(): void {
    this.lessonText = this.miniGameWonText;
    this.playerInfoService.increaseScoreBy(this.reward);
    this.miniGameState = MiniGameState.WON;
  }

  onMiniGameLost(): void {
    if (!this.lessonText) {
      this.lessonText = this.defaultLostText;
    }

    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }

  onDrop(garbage: Garbage, binType: GarbageType) {
    if (garbage.cleared) {
      return;
    }

    if (garbage.type !== binType) {
      this.lessonText = this.getMinigameLostText(garbage);
      this.onMiniGameLost();
    } else {
      garbage.cleared = true;

      if (this.garbages.every(g => g.cleared)) {
        this.onMiniGameWon();
      }
    }
  }
}
