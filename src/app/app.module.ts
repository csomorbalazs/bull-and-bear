import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { HealthBarComponent } from './components/health-bar/health-bar.component';
import { ScoreComponent } from './components/score/score.component';
import { TimerComponent } from './components/timer/timer.component';
import { MiniGameResultComponent } from './components/mini-game-result/mini-game-result.component';
import { LessonScreenComponent } from './components/lesson-screen/lesson-screen.component';
import { InvestmentScreenComponent } from './components/investment-screen/investment-screen.component';
import { EndOfGameScreenComponent } from './components/end-of-game-screen/end-of-game-screen.component';
import { MoneyCountingMiniGameComponent } from './components/mini-games/money-counting-mini-game/money-counting-mini-game.component';
import { MiniGameDirective } from './directives/mini-game.directive';
import { CasinoMiniGameComponent } from './components/mini-games/casino-mini-game/casino-mini-game.component';
import { RouletteComponent } from './mini-games/roulette/roulette.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    StartScreenComponent,
    PlayerInfoComponent,
    HealthBarComponent,
    ScoreComponent,
    TimerComponent,
    MiniGameResultComponent,
    LessonScreenComponent,
    InvestmentScreenComponent,
    EndOfGameScreenComponent,
    MoneyCountingMiniGameComponent,
    MiniGameDirective,
    CasinoMiniGameComponent,
    RouletteComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
