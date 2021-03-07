import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from 'src/app/models/Achievement';

@Component({
  selector: 'achievement-earned',
  templateUrl: './achievement-earned.component.html',
  styleUrls: ['./achievement-earned.component.scss']
})
export class AchievementEarnedComponent implements OnInit {
  @Input() achievement: Achievement;

  constructor() { }

  ngOnInit(): void { }
}
