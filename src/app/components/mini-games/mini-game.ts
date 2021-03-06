import { EventEmitter } from '@angular/core';

export interface MiniGame {
  onMiniGameWon(): void;
  onMiniGameLost(): void;
  finished: EventEmitter<void>;
  timeLimitInSeconds: number;
  reward: number;
}
