import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerInfoService } from 'src/app/services/player-info.service';

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

  constructor(private playerInfoService: PlayerInfoService) {}

  ngOnInit(): void {
    this.secondChancePrice =
      this.secondChanceInitialPrice * Number(this.secondChancePriceMultiplier);
  }

  secondChanceAvailable(): boolean {
    return this.score >= this.secondChancePrice;
  }

  private buyHealth() {
    this.playerInfoService.decreaseScoreBy(this.secondChancePrice);
    this.playerInfoService.increaseHealth();
  }

  onSecondChanceClicked() {
    if (this.secondChanceAvailable()) {
      this.buyHealth();
      this.secondChancePrice =
        this.secondChanceInitialPrice *
        Number(this.secondChancePriceMultiplier);
      this.secondChance.emit();
    } else {
      console.log('not enough score');
    }
  }

  private update() {}
}
