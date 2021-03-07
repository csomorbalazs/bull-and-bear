import { AudioId } from '../models/AudioId';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  sounds: Map<AudioId, string> = new Map([
    [AudioId.LOST, '/assets/audio/minigame-lost.wav'],
    [AudioId.MINIGAME_WON, '/assets/audio/minigame-won.wav'],
    [AudioId.LONG, '/assets/audio/long.mp3'],
    [AudioId.INVESTMENT_REWARD, '/assets/audio/investment-reward.wav'],
    [AudioId.FIREWORKS, '/assets/audio/fireworks.wav'],
  ]);

  mainStarted = false;

  constructor() {}

  playInfinite(sound: AudioId) {
    let mainTheme = new Audio();
    if (!this.mainStarted) {
      mainTheme.src = this.sounds.get(sound);
      mainTheme.loop = true;
      mainTheme.load();
      mainTheme.play();
      this.mainStarted = true;
    }
  }

  playAudio(sound: AudioId) {
    let audio = new Audio();
    audio.src = this.sounds.get(sound);

    audio.load();
    audio.play();
  }
}
