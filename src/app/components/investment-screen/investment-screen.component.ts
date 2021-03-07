import { PlayerInfoService } from 'src/app/services/player-info.service';
import { Investment } from './../../models/Investment';
import { InvestmentsService } from 'src/app/services/investments.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvestmentOption } from 'src/app/models/InvestementOption';

@Component({
  selector: 'investment-screen',
  templateUrl: './investment-screen.component.html',
  styleUrls: ['./investment-screen.component.scss'],
})
export class InvestmentScreenComponent implements OnInit {
  @Output() finished = new EventEmitter<void>();

  investmentOptions: InvestmentOption[];
  runningInvestment: Investment;
  isFinishedInvestment: boolean;
  investmentAmount: number;
  lastInvestmentReward: number;

  constructor(private investmentService: InvestmentsService, private playerInfoService: PlayerInfoService) {}

  ngOnInit(): void {
    this.investmentAmount = Math.round(this.playerInfoService.getCurrentScore() / 2 / 10) * 10;

    this.isFinishedInvestment = this.investmentService.isFinishedInvestment();

    if (this.isFinishedInvestment) {
      setTimeout(() => {
        this.isFinishedInvestment = false;
      }, 5000);
      var lastFinishedInvestment = this.investmentService.getFinishedInvestment();
      this.lastInvestmentReward = lastFinishedInvestment.amount * lastFinishedInvestment.interest;
    }

    this.investmentService.addFinishedInvestmentsToPlayerScore();
    this.investmentOptions = this.investmentService.getInvestmentOptions();
    if (this.investmentService.isRunningInvestment)
      this.runningInvestment = this.investmentService.getRunningInvestment();
  }

  addInvestment(investmentOption: InvestmentOption) {
    if (this.investmentAmount > 0 && this.playerInfoService.getCurrentScore() >= this.investmentAmount) {
      this.investmentService.invest(
        new Investment(this.investmentAmount, investmentOption.duration, investmentOption.interest)
      );
      this.investmentOptions = this.investmentService.getInvestmentOptions();
      this.finished.emit();
    }
  }

  nextClicked() {
    this.finished.emit();
  }

  handleMinus() {
    if (this.investmentAmount >= 10) this.investmentAmount -= 10;
  }
  handlePlus() {
    if (this.playerInfoService.getCurrentScore() > this.investmentAmount) this.investmentAmount += 10;
  }
}
