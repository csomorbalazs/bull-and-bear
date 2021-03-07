import { Investment } from './../models/Investment';
import { Injectable } from '@angular/core';
import { PlayerInfoService } from './player-info.service';
import { InvestmentOption } from '../models/InvestementOption';

@Injectable({
  providedIn: 'root',
})
export class InvestmentsService {
  private investments: Investment[] = [];
  private investmentOptions: InvestmentOption[] = [
    new InvestmentOption(1, 1.5),
    new InvestmentOption(3, 2),
    new InvestmentOption(7, 3),
  ];

  constructor(private playerInfoService: PlayerInfoService) {}

  getInvestmentOptions(): InvestmentOption[] {
    return this.investmentOptions;
  }

  invest(investment: Investment): void {
    this.investments.push(new Investment(investment.amount, investment.duration, investment.interest));
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

  getRunningInvestment(): Investment {
    return this.investments.filter((i) => i.duration > 0)[0];
  }

  isRunningInvestment(): boolean {
    return this.investments.filter((i) => i.duration > 0).length > 0;
  }

  isFinishedInvestment(): boolean {
    return this.getFinishedInvestments().length > 0;
  }

  getFinishedInvestment(): Investment {
    return this.getFinishedInvestments()[0];
  }

  addFinishedInvestmentsToPlayerScore() {
    this.getFinishedInvestments().forEach((i) => {
      this.playerInfoService.increaseScoreBy(i.amount * i.interest);
    });
    this.investments = this.investments.filter((i) => i.duration > 0);
  }
}
