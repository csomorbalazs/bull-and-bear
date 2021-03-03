import { Component, ComponentFactoryResolver, ComponentRef, OnInit, Type, ViewChild } from '@angular/core';
import { MiniGameDirective } from 'src/app/directives/mini-game.directive';
import { GameState } from 'src/app/models/GameState';
import { CasinoMiniGameComponent } from '../mini-games/casino-mini-game/casino-mini-game.component';
import { MiniGame } from '../mini-games/mini-game';
import { MoneyCountingMiniGameComponent } from '../mini-games/money-counting-mini-game/money-counting-mini-game.component';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  GameState = GameState;
  gameState: GameState = GameState.MINIGAME;

  @ViewChild(MiniGameDirective, { static: true }) miniGame: MiniGameDirective;

  private currentMiniGameIndex: number = 0;

  miniGames: Type<any>[] = [
    MoneyCountingMiniGameComponent,
    CasinoMiniGameComponent
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent();
  }

  onMiniGameFinished() {
    this.gameState = GameState.INVESTMENT;
  }

  onInvestmentFinished() {
    this.currentMiniGameIndex = (this.currentMiniGameIndex + 1) % this.miniGames.length;

    this.loadComponent();
    this.gameState = GameState.MINIGAME;
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.miniGames[this.currentMiniGameIndex]);

    const viewContainerRef = this.miniGame.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<MiniGame>(componentFactory);
    componentRef.instance.onFinished.subscribe(() => this.onMiniGameFinished());
  }
}