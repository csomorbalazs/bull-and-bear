import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor() { }

  @Output() gameStarted: EventEmitter<void> = new EventEmitter<void>();



  ngOnInit(): void {
  }

}
