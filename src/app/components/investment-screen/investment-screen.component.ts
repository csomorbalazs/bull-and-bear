import { PlayerInfoService } from 'src/app/services/player-info.service';
import { Investment } from './../../models/Investment';
import { InvestmentsService } from 'src/app/services/investments.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'investment-screen',
  templateUrl: './investment-screen.component.html',
  styleUrls: ['./investment-screen.component.scss'],
})
export class InvestmentScreenComponent implements OnInit {
  @Output() finished = new EventEmitter<void>();

  investmentOptions: Investment[];
  finishedInvestments: Investment[];
  runningInvestments: Investment[];

  constructor(
    private investmentService: InvestmentsService,
    private playerInfoService: PlayerInfoService
  ) {}

  ngOnInit(): void {
    this.investmentService.addFinishedInvestmentsToPlayerScore();

    this.investmentOptions = this.investmentService.getInvestmentOptions();
    this.finishedInvestments = this.investmentService.getFinishedInvestments();
    this.runningInvestments = this.investmentService.getRunningInvestments();
    if (
      this.investmentOptions.every(
        (option) => !this.investmentService.hasMoneyForOption(option)
      )
    ) {
      this.finished.emit();
    }

    console.log(this.runningInvestments);
  }

  addInvestment(investment: Investment) {
    this.investmentService.invest(investment);
    this.investmentOptions = this.investmentService.getInvestmentOptions();
    alert('investment created $');
  }

  nextClicked() {
    this.finished.emit();
  }
}
