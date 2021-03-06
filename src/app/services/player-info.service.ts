import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerInfo } from '../models/PlayerInfo';

@Injectable({
  providedIn: 'root',
})
export class PlayerInfoService {
  private playerInfo: PlayerInfo = new PlayerInfo(3, 0);
  playerInfoMessage = new BehaviorSubject(this.playerInfo);

  constructor() { }

  getCurrentScore() {
    return this.playerInfo.currentScore;
  }

  reset() {
    this.playerInfo.currentHealth = 3;
    this.playerInfo.currentScore = 0;
    this.playerInfoMessage.next(this.playerInfo);
  }

  increaseScoreBy(value: number) {
    this.playerInfo.currentScore += value;
    this.playerInfoMessage.next(this.playerInfo);
  }

  decreaseScoreBy(value: number) {
    if (this.playerInfo.currentScore - value < 0) {
      return;
    }
    this.playerInfo.currentScore -= value;
    this.playerInfoMessage.next(this.playerInfo);
  }

  getCurrentHealth() {
    return this.playerInfo.currentHealth;
  }

  playerIsDead() {
    return this.playerInfo.currentHealth === 0;
  }

  increaseHealth() {
    if (this.playerInfo.currentHealth >= 3) {
      return;
    }
    this.playerInfo.currentHealth++;
    this.playerInfoMessage.next(this.playerInfo);
  }

  decreaseCurrentHealth() {
    if (this.playerInfo.currentHealth <= 0) {
      return;
    }
    this.playerInfo.currentHealth--;
    this.playerInfoMessage.next(this.playerInfo);
  }

  getHighscore(): number {
    const strHighscore = localStorage.getItem('highscore');
    if (strHighscore === null) {
      return 0;
    } else {
      return Number.parseInt(strHighscore);
    }
  }

  setHighscore(value: number) {
    localStorage.setItem('highscore', value.toString());
  }

  getAge(): number {
    const strAge = localStorage.getItem('age');
    if (strAge === null) {
      return null;
    } else {
      return Number.parseInt(strAge);
    }
  }

  setAge(value: number) {
    localStorage.setItem('age', value.toString());
  }
}
