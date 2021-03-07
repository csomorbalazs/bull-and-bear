import { AudioId } from 'src/app/models/AudioId';
import { SoundService } from './../../services/sound.service';
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
  audioIntervalId;
  progressIntervalId;

  constructor(
    private playerInfoService: PlayerInfoService,
    private router: Router,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    this.secondChancePrice = this.secondChanceInitialPrice * Number(this.secondChancePriceMultiplier);

    if (this.secondChanceAvailable()) {
      this.progressIntervalId = setInterval(() => {
        if (this.progressValue) {
          this.progressValue--;
        } else {
          clearInterval(this.progressIntervalId);
          this.refreshHighscore();
        }
      }, 50);
    } else {
      this.refreshHighscore();
      this.playFireworksIfHighscore();
    }
  }

  playFireworksIfHighscore() {
    if (this.isHighscore) {
      this.audioIntervalId = setInterval(() => this.soundService.playAudio(AudioId.FIREWORKS), 2000);
    }
  }

  refreshHighscore() {
    const prevHighscore = this.playerInfoService.getHighscore();
    if (prevHighscore === null || prevHighscore <= this.score) {
      this.playerInfoService.setHighscore(this.score);
      this.isHighscore = true;
      this.playFireworksIfHighscore();
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
      clearInterval(this.audioIntervalId);
      clearInterval(this.progressIntervalId);

      this.buyHealth();
      this.secondChancePrice = this.secondChanceInitialPrice * Number(this.secondChancePriceMultiplier);
      this.secondChance.emit();
    } else {
      console.log('not enough score');
    }
  }

  onRestartClicked() {
    clearInterval(this.audioIntervalId);
    clearInterval(this.progressIntervalId);
    this.router.navigateByUrl('/start');
  }

  onExitClicked() {
    console.log('exit');
    this.router.navigateByUrl('/start');
  }

  private update() {}
}
