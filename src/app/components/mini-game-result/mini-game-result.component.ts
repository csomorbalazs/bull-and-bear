import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';

@Component({
  selector: 'mini-game-result',
  templateUrl: './mini-game-result.component.html',
  styleUrls: ['./mini-game-result.component.scss'],
})
export class MiniGameResultComponent implements OnInit {
  MiniGameState = MiniGameState;
  @Input() result: MiniGameState;
  @Output() resultsViewed = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
