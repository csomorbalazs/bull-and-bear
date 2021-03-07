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

  constructor(
    private playerInfoService: PlayerInfoService,
    private router: Router,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    this.secondChancePrice = this.secondChanceInitialPrice * Number(this.secondChancePriceMultiplier);
    const prevHighscore = this.playerInfoService.getHighscore();
    if (prevHighscore === null || prevHighscore <= this.score) {
      this.playerInfoService.setHighscore(this.score);
      this.isHighscore = true;
    }
    if (this.secondChanceAvailable()) {
      const id = setInterval(() => {
        if (this.progressValue) {
          this.progressValue--;
        } else {
          this.playFireworksIfHighscore();
          clearInterval(id);
        }
      }, 50);
    } else {
      this.playFireworksIfHighscore();
    }
  }

  playFireworksIfHighscore() {
    if (this.isHighscore) {
      this.audioIntervalId = setInterval(() => this.soundService.playAudio(AudioId.FIREWORKS), 2000);
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
      this.isHighscore = false;
      this.buyHealth();
      this.secondChancePrice = this.secondChanceInitialPrice * Number(this.secondChancePriceMultiplier);
      this.secondChance.emit();
    } else {
      console.log('not enough score');
    }
  }

  onRestartClicked() {
    clearInterval(this.audioIntervalId);
    this.router.navigateByUrl('/start');
  }

  onExitClicked() {
    console.log('exit');
    this.router.navigateByUrl('/start');
  }

  private update() {}
}
