import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { MiniGameState } from 'src/app/models/MiniGameState';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { MiniGame } from '../mini-game';

export interface FakeTest {
  imgUrl: string;
  isValid: boolean;
  wonLessonText: string;
  lostLessonText: string;
}

@Component({
  selector: 'fake-or-not',
  templateUrl: './fake-or-not.component.html',
  styleUrls: ['./fake-or-not.component.scss'],
})
export class FakeOrNotComponent implements OnInit, MiniGame {
  Character = Character;
  MiniGameState = MiniGameState;
  miniGameState: MiniGameState = MiniGameState.GAMEPLAY;
  availableTests: FakeTest[] = [
    {
      imgUrl: 'assets/fake-or-not/sms_spam_01.png',
      isValid: false,
      wonLessonText:
        'Gratulálok! 🎉 Ügyesen észrevetted, hogy az sms egy ismeretlen, külföldi telefonszámról érkezett, és egy gyanús ☠️ webcímet tartalmaz. ',
      lostLessonText:
        'Hoppá! 😱 Az sms egy ismeretlen, külföldi telefonszámról érkezett, és egy gyanús ☠️ webcímet tartalmazott. Minidg kerüld el a gyanús webcímeket és feladókat!',
    },
    {
      imgUrl: 'assets/fake-or-not/mav.jpg',
      isValid: true,
      wonLessonText:
        'Gratulálok! 🎉 Ügyesen észrevetted, hogy az online fizetőoldal megbízható. 👌 Mindig ügyelj, hol adod meg a bankkártya adataid!',
      lostLessonText:
        'Hoppá! 😱 Az online fizetőoldal megbízható volt! Egy kis lakat 🔒 jelzi általában a weboldalak címe mellett, ha a weboldal megbízható.',
    },
    {
      imgUrl: 'assets/fake-or-not/fake-email.jpg',
      isValid: false,
      wonLessonText:
        'Gratulálok! 🎉 Felismerted, hogy az e-mail veszélyesnek ☠️ tűnik! Mindig figyelj a levelezőrendszered felhívásaira! Ha gyanúsnak tűnik egy e-mail, ellenőrizd a feladót!',
      lostLessonText:
        'Hoppá! 😱 Az e-mail veszélyes lehet! ☠️ Mindig figyelj a levelezőrendszered felhívásaira! Ha gyanúsnak tűnik egy e-mail, ellenőrizd a feladót!',
    },
    {
      imgUrl: 'assets/fake-or-not/mnb.jpg',
      isValid: true,
      wonLessonText:
        'Ügyes vagy! 🎉 Felismerted, hogy az oldal megbízható! Egy kis lakat 🔒 jelzi általában a weboldalak címe mellett, ha a weboldal megbízható.',
      lostLessonText:
        'Jaj! 😱 Az oldal megbízható volt. Egy kis lakat 🔒 jelzi általában a weboldalak címe mellett, ha a weboldal megbízható.',
    },
    {
      imgUrl: 'assets/fake-or-not/no-https.jpg',
      isValid: false,
      wonLessonText:
        'Ügyes vagy! 🎉 Ha egy oldal nem rendelkezik megfelelő tanúsítvánnyal 🔏, akkor nem szabad megbízni benne!',
      lostLessonText:
        'Jaj! 😱 Az oldal nem rendelkeztt megfelelő tanúsítvánnyal! 🔏 Sose használj nem megbízható oldalakat!',
    },
  ];

  selected = this.availableTests[this.getRandomIndex()];

  @Input() timeLimitInSeconds: number;
  @Input() reward: number;
  @Output() finished = new EventEmitter<void>();

  lessonText: string;

  constructor(private playerInfoService: PlayerInfoService) {}

  onMiniGameWon(): void {
    this.playerInfoService.increaseScoreBy(this.reward);
    this.miniGameState = MiniGameState.WON;
  }
  onMiniGameLost(): void {
    this.playerInfoService.decreaseCurrentHealth();
    this.miniGameState = MiniGameState.LOST;
  }

  ngOnInit(): void {}

  evaluateResult(clicked: boolean) {
    if (clicked === this.selected.isValid) {
      this.lessonText = this.selected.wonLessonText;
      this.onMiniGameWon();
    } else {
      this.lessonText = this.selected.lostLessonText;
      this.onMiniGameLost();
    }
  }

  getRandomIndex() {
    return Math.floor(Math.random() * this.availableTests.length);
  }
}
