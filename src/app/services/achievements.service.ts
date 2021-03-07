import { Injectable } from '@angular/core';
import { Achievement } from '../models/Achievement';
import { PlayerInfoService } from './player-info.service';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  constructor(private playerInfoService: PlayerInfoService) { }

  private achievements: Achievement[] = [
    new Achievement(
      "score-100",
      "100",
      "assets/achievements/bronze-money.svg",
      () => {
        return this.playerInfoService.getHighscore() >= 10 || this.playerInfoService.getCurrentScore() >= 100;
      }
    ),
    new Achievement(
      "score-1000",
      "1000",
      "assets/achievements/silver-money.svg",
      () => {
        return this.playerInfoService.getHighscore() >= 1000 || this.playerInfoService.getCurrentScore() >= 1000;
      }
    ),
    new Achievement(
      "score-10000",
      "10000",
      "assets/achievements/gold-money.svg",
      () => {
        return this.playerInfoService.getHighscore() >= 10000 || this.playerInfoService.getCurrentScore() >= 10000;
      }
    ),
  ];

  private getSavedAchievements() {
    const achievementIds: string[] = JSON.parse(localStorage.getItem('achievements')) ?? [];

    return this.achievements.filter(a => achievementIds.indexOf(a.id) !== -1);
  }

  private getNotSavedAchievements() {
    const achievementIds: string[] = JSON.parse(localStorage.getItem('achievements')) ?? [];

    return this.achievements.filter(a => achievementIds.indexOf(a.id) === -1);
  }

  private saveAchievements(achievements: Achievement[]): void {
    const achievementIds: string[] = JSON.parse(localStorage.getItem('achievements')) ?? [];
    achievementIds.push(...achievements.map(a => a.id));

    localStorage.setItem('achievements', JSON.stringify(achievementIds));
  }

  getAchievements(): Achievement[] {
    const saved = this.getSavedAchievements();
    saved.forEach(a => a.setEarned(true));

    return this.achievements;
  }

  updateNewlyEarnedAchievements(): Achievement[] {
    const newlyEarned = this.getNotSavedAchievements().filter(a => a.isEarned());
    this.saveAchievements(newlyEarned);

    return newlyEarned;
  }
}
