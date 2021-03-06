import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';

@Component({
  selector: 'mini-game-result',
  templateUrl: './mini-game-result.component.html',
  styleUrls: ['./mini-game-result.component.scss'],
})
export class MiniGameResultComponent implements OnInit {
  MiniGameState = MiniGameState;
  @Input() result: MiniGameState;
  @Input() reward: number;
  @Output() resultsViewed = new EventEmitter<void>();

  health: number;

  constructor(private playerInfoService: PlayerInfoService) { }

  ngOnInit(): void {
    this.health = this.playerInfoService.getCurrentHealth();

    setInterval(() => this.resultsViewed.emit(), 2000);
  }
}
