import { FakeOrNotComponent } from './../mini-games/fake-or-not/fake-or-not.component';
import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild } from '@angular/core';
import { MiniGameDirective } from 'src/app/directives/mini-game.directive';
import { GameState } from 'src/app/models/GameState';
import { InvestmentsService } from 'src/app/services/investments.service';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { CasinoMiniGameComponent } from '../mini-games/casino-mini-game/casino-mini-game.component';
import { MiniGame } from '../mini-games/mini-game';
import { MoneyCountingMiniGameComponent } from '../mini-games/money-counting-mini-game/money-counting-mini-game.component';
import { getRandomIndices } from 'src/app/utils/randomizer';
import { MiniGameMetaData } from 'src/app/models/MiniGameMetaData';
import { WorthItMinigameComponent } from '../mini-games/worth-it-minigame/worth-it-minigame.component';
import { MiningMinigameComponent } from '../mini-games/mining-mini-game/mining-mini-game.component';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  GameState = GameState;
  gameState: GameState = GameState.MINIGAME;
  secondChancePriceMultiplier: number = 1;
  timeLimitMultiplier: number = 0.95;
  timeLimitInSeconds: number = 15;
  reward: number = 50;

  @ViewChild(MiniGameDirective, { static: true }) miniGame: MiniGameDirective;

  private currentMiniGameIndex: number;

  private miniGames: MiniGameMetaData[] = [
    {
      miniGameType: MoneyCountingMiniGameComponent,
      minimumAge: 0,
    },
    {
      miniGameType: CasinoMiniGameComponent,
      minimumAge: 0,
    },
    {
      miniGameType: FakeOrNotComponent,
      minimumAge: 12,
    },
    {
      miniGameType: WorthItMinigameComponent,
      minimumAge: 12,
    },
    {
      miniGameType: MiningMinigameComponent,
      minimumAge: 0,
    },
  ];

  private miniGameIndices = getRandomIndices(this.miniGames.length);

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private playerInfoService: PlayerInfoService,
    private investmentsService: InvestmentsService
  ) {}

  ngOnInit(): void {
    this.miniGames = this.miniGames.filter((game) => game.minimumAge <= this.playerInfoService.getAge());
    this.miniGameIndices = getRandomIndices(this.miniGames.length);

    this.playerInfoService.reset();
    this.loadRandomMiniGame();
  }

  onMiniGameFinished() {
    this.investmentsService.miniGameElapsed();

    if (this.timeLimitInSeconds >= 3) this.timeLimitInSeconds *= this.timeLimitMultiplier;

    if (this.playerInfoService.playerIsDead()) {
      this.gameState = GameState.ENDOFGAME;
    } else if (this.playerInfoService.getCurrentScore() >= 10 && !this.investmentsService.isRunningInvestment()) {
      this.gameState = GameState.INVESTMENT;
    } else if (this.investmentsService.isRunningInvestment()) {
      this.gameState = GameState.RUNNINGINVESTMENT;
    } else {
      this.loadRandomMiniGame();
    }
  }

  onInvestmentFinished() {
    this.loadRandomMiniGame();
  }

  onSecondChance() {
    this.secondChancePriceMultiplier *= 2;
    this.loadRandomMiniGame();
  }

  loadRandomMiniGame() {
    if (this.miniGameIndices.length === 0) {
      this.miniGameIndices = getRandomIndices(this.miniGames.length);
    }

    this.currentMiniGameIndex = this.miniGameIndices.pop();
    this.loadComponent();
    this.gameState = GameState.MINIGAME;
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.miniGames[this.currentMiniGameIndex].miniGameType
    );

    const viewContainerRef = this.miniGame.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<MiniGame>(componentFactory);
    componentRef.instance.finished.subscribe(() => this.onMiniGameFinished());
    componentRef.instance.timeLimitInSeconds = this.timeLimitInSeconds;
    componentRef.instance.reward = this.reward;
  }
}
