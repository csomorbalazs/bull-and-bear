import { SoundService } from './../../services/sound.service';
import { PlayerInfoService } from 'src/app/services/player-info.service';
import { Investment } from './../../models/Investment';
import { InvestmentsService } from 'src/app/services/investments.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InvestmentOption } from 'src/app/models/InvestementOption';
import { InvestmentScreenState } from 'src/app/models/InvestementScreenState';
import { Character } from 'src/app/models/Character';
import { AudioId } from 'src/app/models/AudioId';
import { AchievementsService } from 'src/app/services/achievements.service';
import { Achievement } from 'src/app/models/Achievement';

@Component({
  selector: 'investment-screen',
  templateUrl: './investment-screen.component.html',
  styleUrls: ['./investment-screen.component.scss'],
})
export class InvestmentScreenComponent implements OnInit {
  @Output() finished = new EventEmitter<void>();

  InvestmentScreenState = InvestmentScreenState;
  Character = Character;

  investmentOptions: InvestmentOption[];
  runningInvestment: Investment;
  investmentAmount: number;
  lastInvestmentReward: number;

  investmentFormScale = 10;

  investmentScreenState: InvestmentScreenState;
  onboardingText = [
    'Gratulálok 🤩, ügyesen megoldottad első feladatodat! A következő oldalon az összegyűjtött pénzedet tudod befektetni. Egyszerre mindig egy befektetésed lehet, ha az lejárt, akkor indíthatod a következőt.',
    'Különböző hosszúságú befektetések vannak. Minél több ideig fektetsz be, annál többet fog kamatozni! 💸',
    'Azonban vigyázz 😱, ha elfogy minden életed, és nincs pénzed, nem tudsz új életet venni! Azt tanácsolom, mindig legyen nálad egy kis pénz, ne fektesd be egyszerre az összeset.',
  ];

  newlyEarnedAchievement: Achievement;

  constructor(
    private investmentService: InvestmentsService,
    private playerInfoService: PlayerInfoService,
    private achievementsService: AchievementsService,
    private soundService: SoundService
  ) { }

  ngOnInit(): void {
    if (this.playerInfoService.isFirstInvestment()) {
      this.playerInfoService.setFirstInvestment();
      this.investmentScreenState = InvestmentScreenState.ONBOARDING;
    } else if (this.investmentService.isFinishedInvestment()) {
      this.investmentScreenState = InvestmentScreenState.FINISHEDINVESTMENT;
      this.soundService.playAudio(AudioId.INVESTMENT_REWARD);

      setTimeout(() => {
        this.checkAchievements();
      }, 3000);

      var lastFinishedInvestment = this.investmentService.getFinishedInvestment();
      this.lastInvestmentReward = lastFinishedInvestment.amount * lastFinishedInvestment.interest;
    } else {
      this.investmentScreenState = InvestmentScreenState.NEWINVESTMENT;
    }

    this.investmentService.addFinishedInvestmentsToPlayerScore();
    this.investmentOptions = this.investmentService.getInvestmentOptions();
    if (this.investmentService.isRunningInvestment)
      this.runningInvestment = this.investmentService.getRunningInvestment();

    this.investmentAmount = Math.round(this.playerInfoService.getCurrentScore() / 2 / 10) * 10;

    if (this.playerInfoService.getCurrentScore() / 1000 >= 1) {
      this.investmentFormScale = 100;
    } else {
      this.investmentFormScale = 10;
    }
  }

  addInvestment(investmentOption: InvestmentOption) {
    if (this.investmentAmount > 0 && this.playerInfoService.getCurrentScore() >= this.investmentAmount) {
      this.investmentService.invest(
        new Investment(this.investmentAmount, investmentOption.duration, investmentOption.interest)
      );
      this.investmentOptions = this.investmentService.getInvestmentOptions();
      this.finished.emit();
    }
  }

  nextClicked() {
    this.finished.emit();
  }

  handleMinus() {
    if (this.investmentAmount >= this.investmentFormScale) this.investmentAmount -= this.investmentFormScale;
  }

  handlePlus() {
    if (this.playerInfoService.getCurrentScore() > this.investmentAmount + this.investmentFormScale / 2)
      this.investmentAmount += this.investmentFormScale;
  }

  onboardingViewed() {
    this.investmentScreenState = InvestmentScreenState.NEWINVESTMENT;
  }

  checkAchievements() {
    const achievements = this.achievementsService.updateNewlyEarnedAchievements();

    if (achievements.length > 0) {
      this.newlyEarnedAchievement = achievements[0];
      this.investmentScreenState = InvestmentScreenState.ACHIEVEMENT_EARNED;
      setTimeout(() => this.investmentScreenState = InvestmentScreenState.NEWINVESTMENT, 3000);
    } else {
      this.investmentScreenState = InvestmentScreenState.NEWINVESTMENT;
    }
  }
}
