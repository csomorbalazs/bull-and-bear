import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { MiniGame } from '../mini-game';

export interface FakeTest {
  imgUrl: string;
  isFake: boolean;
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
    { imgUrl: '../../assets/fake-or-not/sms_spam_01.png', isFake: true },
    { imgUrl: '../../assets/fake-or-not/otp.png', isFake: false },
  ];

  img = this.availableTests[1].imgUrl;

  @Input() timeLimitInSeconds: number;
  @Output() finished = new EventEmitter<void>();

  constructor(private playerInfoService: PlayerInfoService) {}

  ngOnInit(): void {}

  onMiniGameWon() {
    this.playerInfoService.increaseScoreBy(50);
    this.miniGameState = MiniGameState.WON;
  }

  onMiniGameLost() {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }

  onTimeIsUp() {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
    this.finished.emit();
  }
}
