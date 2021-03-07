import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Achievement } from 'src/app/models/Achievement';
import { AchievementsService } from 'src/app/services/achievements.service';

@Component({
  selector: 'achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  achievements: Achievement[];

  constructor(
    private router: Router,
    private achievementService: AchievementsService
  ) { }

  ngOnInit(): void {
    this.achievements = this.achievementService.getAchievements();
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }
}
