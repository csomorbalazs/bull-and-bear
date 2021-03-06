import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerInfoService } from 'src/app/services/player-info.service';

@Component({
  selector: 'start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  @Output() gameStarted: EventEmitter<void> = new EventEmitter<void>();
  ageAlreadyProvided: boolean;
  showAgeInputScreen: boolean = false;
  age: number;
  ageInvalid = false;

  constructor(public playerInfoService: PlayerInfoService) { }

  ngOnInit(): void {
    this.ageAlreadyProvided = this.playerInfoService.getAge() !== null;
  }

  onStartClicked(): void {
    if (!this.ageAlreadyProvided) {
      this.showAgeInputScreen = true;
    } else {
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
