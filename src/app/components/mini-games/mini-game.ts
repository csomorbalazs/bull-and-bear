import { EventEmitter } from '@angular/core';
import { MiniGameState } from 'src/app/models/MiniGameState';

export interface MiniGame {
  onMiniGameWon(): void;
  onMiniGameLost(): void;
  finished: EventEmitter<void>;
  timeLimitInSeconds: number;
  reward: number;
  miniGameState: MiniGameState;
}
