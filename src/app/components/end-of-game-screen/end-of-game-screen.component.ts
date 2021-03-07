import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'end-of-game-screen',
  templateUrl: './end-of-game-screen.component.html',
  styleUrls: ['./end-of-game-screen.component.scss'],
})
export class EndOfGameScreenComponent implements OnInit {
  private secondChanceInitialPrice: number = 50;
  @Input() secondChancePriceMultiplier: number;
  @Output() secondChance: EventEmitter<void> = new EventEmitter<void>();
  secondChancePrice: number = 0;
  score = this.playerInfoService.getCurrentScore();
  progressValue = 100;
  progressMode: ProgressSpinnerMode = 'determinate';
  isHighscore = false;

  constructor(private playerInfoService: PlayerInfoService, private router: Router) {}

  ngOnInit(): void {
    this.secondChancePrice = this.secondChanceInitialPrice * Number(this.secondChancePriceMultiplier);
    if (true) {
      setInterval(() => {
        if (this.progressValue) {
          this.progressValue--;
        }
        this.secondChanceAvailable();
      }, 50);
    }
    const prevHighscore = this.playerInfoService.getHighscore();
    if (prevHighscore === null || prevHighscore <= this.score) {
      this.playerInfoService.setHighscore(this.score);
      this.isHighscore = true;
    }
  }

  secondChanceAvailable(): boolean {
    return this.score >= this.secondChancePrice && this.progressValue > 0;
  }

  private buyHealth() {
    this.playerInfoService.decreaseScoreBy(this.secondChancePrice);
    this.playerInfoService.increaseHealth();
  }

  onSecondChanceClicked() {
    if (this.secondChanceAvailable()) {
      this.buyHealth();
      this.secondChancePrice = this.secondChanceInitialPrice * Number(this.secondChancePriceMultiplier);
      this.secondChance.emit();
    } else {
      console.log('not enough score');
    }
  }

  onRestartClicked() {
    this.router.navigateByUrl('/start');
  }

  onExitClicked() {
    console.log('exit');
    this.router.navigateByUrl('/start');
  }

  private update() {}
}
