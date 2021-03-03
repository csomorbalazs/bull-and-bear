import { EventEmitter } from "@angular/core";

export interface MiniGame {
  onFinished: EventEmitter<void>;
}