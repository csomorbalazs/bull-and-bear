import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { MiniGame } from '../mini-game';

@Component({
  selector: 'casino-mini-game',
  templateUrl: './casino-mini-game.component.html',
  styleUrls: ['./casino-mini-game.component.scss']
})
export class CasinoMiniGameComponent implements OnInit, MiniGame {
  @Input() onFinished = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
