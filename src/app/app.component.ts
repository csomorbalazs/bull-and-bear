import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  started: boolean = false;

  constructor() { }

  onGameStarted() {
    this.started = true;
  }

  ngOnInit(): void {
  }

}
