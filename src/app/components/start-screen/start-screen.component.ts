import { SoundService } from './../../services/sound.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { Router } from '@angular/router';
import { AudioId } from 'src/app/models/AudioId';

@Component({
  selector: 'start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  @Output() gameStarted: EventEmitter<void> = new EventEmitter<void>();
  ageAlreadyProvided: boolean;
  showAgeInputScreen: boolean = false;
  age: number;
  ageInvalid = false;

  constructor(
    public playerInfoService: PlayerInfoService,
    private router: Router,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    this.ageAlreadyProvided = this.playerInfoService.getAge() !== null;
  }

  onStartClicked(): void {
    this.soundService.playInfinite(AudioId.LONG);
    if (!this.ageAlreadyProvided) {
      this.showAgeInputScreen = true;
    } else {
      this.router.navigateByUrl('/game');
      this.gameStarted.emit();
    }
  }

  ageChanged(age: string) {
    this.age = parseInt(age);

    if (this.age > 0 && this.age < 99) {
      this.playerInfoService.setAge(this.age);
      this.ageAlreadyProvided = true;
      this.ageInvalid = false;
    } else {
      this.ageInvalid = true;
    }
  }
}
