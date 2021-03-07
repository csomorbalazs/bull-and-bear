import { GarbageType } from "./GarbageType";

export class Garbage {
  cleared: boolean = false;

  constructor(public type: GarbageType, public imagePath: string, public name: string) { }
}