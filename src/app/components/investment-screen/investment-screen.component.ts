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
  finishedInvestments: Investment[];
  runningInvestment: Investment;

  investmentAmount = 30;

  constructor(
    private investmentService: InvestmentsService,
    private playerInfoService: PlayerInfoService
  ) { }

  ngOnInit(): void {
    this.investmentService.addFinishedInvestmentsToPlayerScore();

    this.investmentOptions = this.investmentService.getInvestmentOptions();
    this.finishedInvestments = this.investmentService.getFinishedInvestments();
    this.runningInvestment = this.investmentService.getRunningInvestment();
    /*     if (
          this.investmentOptions.every(
            (option) => !this.investmentService.hasMoneyForOption(option)
          )
        ) {
          this.finished.emit();
        } */

    console.log(this.runningInvestment);
  }

  addInvestment(investmentOption: InvestmentOption) {

    this.investmentService.invest(new Investment(
      this.investmentAmount,
      investmentOption.duration,
      investmentOption.interest
    ));
    this.investmentOptions = this.investmentService.getInvestmentOptions();
    alert('investment created $');
  }

  nextClicked() {
    this.finished.emit();
  }

  handleMinus() {
    if (this.investmentAmount >= 10) this.investmentAmount -= 10;
  }
  handlePlus() {
    this.investmentAmount += 10;
  }
}
