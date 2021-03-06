import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { MiniGame } from '../mini-game';

export interface FakeTest {
  imgUrl: string;
  isValid: boolean;
}

@Component({
  selector: 'fake-or-not',
  templateUrl: './fake-or-not.component.html',
  styleUrls: ['./fake-or-not.component.scss'],
})
export class FakeOrNotComponent implements OnInit, MiniGame {
  MiniGameState = MiniGameState;
  miniGameState: MiniGameState = MiniGameState.GAMEPLAY;
  availableTests: FakeTest[] = [
    { imgUrl: 'assets/fake-or-not/sms_spam_01.png', isValid: false },
    { imgUrl: 'assets/fake-or-not/otp.png', isValid: true },
  ];

  selected = this.availableTests[this.getRandomIndex()];

  @Input() timeLimitInSeconds: number;
  @Input() reward: number;
  @Output() finished = new EventEmitter<void>();

  constructor(private playerInfoService: PlayerInfoService) { }

  onMiniGameWon(): void {
    this.playerInfoService.increaseScoreBy(50);
    this.miniGameState = MiniGameState.WON;
  }
  onMiniGameLost(): void {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }

  ngOnInit(): void { }

  evaluateResult(clicked: boolean) {
    if (clicked === this.selected.isValid) {
      this.onMiniGameWon();
    } else {
      this.onMiniGameLost();
    }
  }

  getRandomIndex() {
    return Math.floor(Math.random() * this.availableTests.length);
  }
}
