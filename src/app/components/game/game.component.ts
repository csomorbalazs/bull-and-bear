import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { MiniGameDirective } from 'src/app/directives/mini-game.directive';
import { GameState } from 'src/app/models/GameState';
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

  @ViewChild(MiniGameDirective, { static: true }) miniGame: MiniGameDirective;

  private currentMiniGameIndex: number = 0;

  miniGames: Type<any>[] = [
    MoneyCountingMiniGameComponent,
    CasinoMiniGameComponent,
  ];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private playerInfoService: PlayerInfoService
  ) {}

  ngOnInit(): void {
    this.playerInfoService.reset();
    this.loadComponent();
  }

  onMiniGameFinished() {
    this.playerInfoService.playerIsDead()
      ? (this.gameState = GameState.ENDOFGAME)
      : (this.gameState = GameState.INVESTMENT);
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
  }
}
