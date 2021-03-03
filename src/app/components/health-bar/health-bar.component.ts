import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'health-bar',
  templateUrl: './health-bar.component.html',
  styleUrls: ['./health-bar.component.scss']
})
export class HealthBarComponent implements OnInit {
  @Input() value: number;

  constructor() { }

  ngOnInit(): void { }

}
