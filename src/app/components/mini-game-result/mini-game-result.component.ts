import { SoundService } from './../../services/sound.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { AudioId } from 'src/app/models/AudioId';
import { AchievementsService } from 'src/app/services/achievements.service';
import { Achievement } from 'src/app/models/Achievement';

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
  newlyEarnedAchievement: Achievement;

  constructor(
    private playerInfoService: PlayerInfoService,
    private soundService: SoundService,
    private achievementsService: AchievementsService) { }

  ngOnInit(): void {
    this.health = this.playerInfoService.getCurrentHealth();

    if (this.result === MiniGameState.LOST) {
      this.soundService.playAudio(AudioId.LOST);
    } else if (this.result === MiniGameState.WON) {
      this.soundService.playAudio(AudioId.MINIGAME_WON);
    }

    setTimeout(() => this.checkAchievements(), 2000);
  }

  checkAchievements() {
    const achievements = this.achievementsService.updateNewlyEarnedAchievements();

    if (achievements.length > 0) {
      this.newlyEarnedAchievement = achievements[0];
      setTimeout(() => this.resultsViewed.emit(), 3000);
    } else {
      this.resultsViewed.emit();
    }
  }
}
