import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Character } from '../models/Character';
import { InvestmentsService } from '../services/investments.service';

@Component({
  selector: 'running-investment-screen',
  templateUrl: './running-investment-screen.component.html',
  styleUrls: ['./running-investment-screen.component.scss']
})
export class RunningInvestmentScreenComponent implements OnInit {
  Character = Character;

  remainingDuration = this.investmentService.getRunningInvestment().duration;

  text: string = "Csak így tovább! A befektetésed "+this.remainingDuration+" kör múlva meghozza gyümölcsét!";
  @Input() character: Character;
  @Output() lessonViewed = new EventEmitter<void>();
  constructor( private investmentService: InvestmentsService) { }

  ngOnInit(): void {
  }

}
