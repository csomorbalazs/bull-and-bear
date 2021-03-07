import { PlayerInfoService } from 'src/app/services/player-info.service';
import { Investment } from './../../models/Investment';
import { InvestmentsService } from 'src/app/services/investments.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvestmentOption } from 'src/app/models/InvestementOption';
import { InvestmentScreenState } from 'src/app/models/InvestementScreenState';
import { Character } from 'src/app/models/Character';

@Component({
  selector: 'investment-screen',
  templateUrl: './investment-screen.component.html',
  styleUrls: ['./investment-screen.component.scss'],
})
export class InvestmentScreenComponent implements OnInit {
  @Output() finished = new EventEmitter<void>();

  InvestmentScreenState = InvestmentScreenState;
  Character = Character;

  investmentOptions: InvestmentOption[];
  runningInvestment: Investment;
  investmentAmount: number;
  lastInvestmentReward: number;

  investemnetScreenState: InvestmentScreenState;
  firstInvestment: string;

  constructor(private investmentService: InvestmentsService, private playerInfoService: PlayerInfoService) {}

  ngOnInit(): void {
    this.firstInvestment = localStorage.getItem('firstInvestment');

    this.investmentAmount = Math.round(this.playerInfoService.getCurrentScore() / 2 / 10) * 10;

    if (this.firstInvestment == null) {
      localStorage.setItem('firstInvestment', 'false');
      this.investemnetScreenState = InvestmentScreenState.ONBOARDING;
    } else if (this.investmentService.isFinishedInvestment()) {
      this.investemnetScreenState = InvestmentScreenState.FINISHEDINVESTMENT;
      setTimeout(() => {
        this.investemnetScreenState = InvestmentScreenState.NEWINVESTMENT;
      }, 5000);
      var lastFinishedInvestment = this.investmentService.getFinishedInvestment();
      this.lastInvestmentReward = lastFinishedInvestment.amount * lastFinishedInvestment.interest;
    } else {
      this.investemnetScreenState = InvestmentScreenState.NEWINVESTMENT;
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
    if (this.playerInfoService.getCurrentScore() > this.investmentAmount + 5) this.investmentAmount += 10;
  }

  onboardingViewed() {
    this.investemnetScreenState = InvestmentScreenState.NEWINVESTMENT;
  }
}
