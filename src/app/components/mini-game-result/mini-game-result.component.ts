import { SoundService } from './../../services/sound.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { AudioId } from 'src/app/models/AudioId';

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

  constructor(private playerInfoService: PlayerInfoService, private soundService: SoundService) {}

  ngOnInit(): void {
    this.health = this.playerInfoService.getCurrentHealth();

    if (this.result === MiniGameState.LOST) {
      this.soundService.playAudio(AudioId.LOST);
    } else if (this.result === MiniGameState.WON) {
      this.soundService.playAudio(AudioId.MINIGAME_WON);
    }

    setInterval(() => this.resultsViewed.emit(), 2000);
  }
}
