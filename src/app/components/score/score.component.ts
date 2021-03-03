import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  @Input() value: number;

  constructor() { }

  ngOnInit(): void { }

}
