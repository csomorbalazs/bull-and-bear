import { FakeOrNotComponent } from './../mini-games/fake-or-not/fake-or-not.component';
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { MiniGameDirective } from 'src/app/directives/mini-game.directive';
import { GameState } from 'src/app/models/GameState';
import { InvestmentsService } from 'src/app/services/investments.service';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { CasinoMiniGameComponent } from '../mini-games/casino-mini-game/casino-mini-game.component';
import { MiniGame } from '../mini-games/mini-game';
import { MoneyCountingMiniGameComponent } from '../mini-games/money-counting-mini-game/money-counting-mini-game.component';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  GameState = GameState;
  gameState: GameState = GameState.MINIGAME;
  secondChancePriceMultiplier: number = 1;
  timeLimitMultiplier: number = 0.9;
  timeLimitInSeconds: number = 10;
  reward: number = 50;

  @ViewChild(MiniGameDirective, { static: true }) miniGame: MiniGameDirective;

  private currentMiniGameIndex: number = 0;

  miniGames: Type<any>[] = [
    MoneyCountingMiniGameComponent,
    CasinoMiniGameComponent,
    FakeOrNotComponent,
  ];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private playerInfoService: PlayerInfoService,
    private investmentsService: InvestmentsService
  ) { }

  ngOnInit(): void {
    this.playerInfoService.reset();
    this.loadComponent();
  }

  onMiniGameFinished() {
    this.investmentsService.miniGameElapsed();

    this.timeLimitInSeconds *= this.timeLimitMultiplier;

    if (this.playerInfoService.playerIsDead()) {
      this.gameState = GameState.ENDOFGAME;
    } else if (this.investmentsService.hasMoneyForAnyOption()) {
      this.gameState = GameState.INVESTMENT;
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
    this.currentMiniGameIndex =
      (this.currentMiniGameIndex + 1) % this.miniGames.length;
    this.loadComponent();
    this.gameState = GameState.MINIGAME;
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.miniGames[this.currentMiniGameIndex]
    );

    const viewContainerRef = this.miniGame.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<MiniGame>(
      componentFactory
    );
    componentRef.instance.finished.subscribe(() => this.onMiniGameFinished());
    componentRef.instance.timeLimitInSeconds = this.timeLimitInSeconds;
    componentRef.instance.reward = this.reward;
  }
}
