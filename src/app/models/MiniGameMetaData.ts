import { Type } from "@angular/core";
import { MiniGame } from "../components/mini-games/mini-game";

export interface MiniGameMetaData {
  miniGameType: Type<MiniGame>,
  minimumAge: number,
}