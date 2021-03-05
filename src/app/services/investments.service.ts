import { Investment } from './../models/Investment';
import { Injectable } from '@angular/core';
import { PlayerInfoService } from './player-info.service';

@Injectable({
  providedIn: 'root',
})
export class InvestmentsService {
  private investments: Investment[] = [];
  private investmentOptions: Investment[] = [
    new Investment(100, 1, 110),
    new Investment(100, 3, 120),
    new Investment(100, 3, 120),
  ];

  constructor(private playerInfoService: PlayerInfoService) {}

  getInvestmentOptions(): Investment[] {
    return this.investmentOptions;
  }

  invest(investment: Investment): void {
    this.investments.push(
      new Investment(
        investment.amount,
        investment.duration,
        investment.returnAmount
      )
    );

    this.playerInfoService.decreaseScoreBy(investment.amount);
  }

  miniGameElapsed() {
    this.investments.forEach((investment) => {
      investment.duration--;
    });
  }

  getFinishedInvestments(): Investment[] {
    return this.investments.filter((i) => i.duration <= 0);
  }

  getRunningInvestments(): Investment[] {
    return this.investments.filter((i) => i.duration > 0);
  }

  addFinishedInvestmentsToPlayerScore() {
    this.getFinishedInvestments().forEach((i) => {
      this.playerInfoService.increaseScoreBy(i.returnAmount);
      alert('score increased by ' + i.returnAmount);
    });

    this.investments = this.investments.filter((i) => i.duration > 0);
  }

  hasMoneyForOption(option: Investment): boolean {
    return option.amount <= this.playerInfoService.getCurrentScore();
  }

  hasMoneyForAnyOption(): boolean {
    return this.investmentOptions.some((i) => this.hasMoneyForOption(i));
  }
}
