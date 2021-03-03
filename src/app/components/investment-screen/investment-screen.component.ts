import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'investment-screen',
  templateUrl: './investment-screen.component.html',
  styleUrls: ['./investment-screen.component.scss']
})
export class InvestmentScreenComponent implements OnInit {
  @Output() onFinished = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
