import { EventEmitter } from "@angular/core";

export interface MiniGame {
  onMiniGameWon(): void;
  onMiniGameLost(): void;
  onFinished: EventEmitter<void>;
}