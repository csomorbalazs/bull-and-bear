import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() initialTimeInSeconds: string;
  @Output() timeIsUp = new EventEmitter<boolean>();

  //TODO: adjust colors
  private colorStops: {} = {
    0: '#E1341E',
    20: '#F99E06',
    40: '#E8EE11',
    60: '#C6D926',
    80: '#5DAC53',
    90: '#18F40B',
    100: '#1ECF5D',
  };

  private currentColor: string;
  private progressPercentage: number;
  private timeLeftInMs: number;
  private initialTimeInMs: number;

  constructor() {}

  ngOnInit(): void {
    this.currentColor = this.colorStops[100];
    this.timeLeftInMs = this.initialTimeInMs =
      Number(this.initialTimeInSeconds) * 1000;
    this.progressPercentage = 100;
    let timer = setInterval(() => {
      if (this.timeLeftInMs > 0) {
        this.updateTimer();
      } else {
        this.timeIsUp.emit();
        clearInterval(timer);
      }
    }, 10);
  }

  updateTimer() {
    this.timeLeftInMs -= 10;
    this.progressPercentage = this.calculateProgressPercentage();
    this.currentColor = this.calculateColor();
  }

  calculateProgressPercentage(): number {
    return (this.timeLeftInMs / Number(this.initialTimeInMs)) * 100;
  }

  calculateColor() {
    let colorStopKeys: Array<number> = Object.keys(this.colorStops).map((k) =>
      Number(k)
    );
    let colorStopPercentage = colorStopKeys[0];
    for (let percentage of colorStopKeys) {
      if (percentage < this.progressPercentage) {
        colorStopPercentage = percentage;
      } else if (percentage >= this.progressPercentage) {
        return this.colorStops[colorStopPercentage];
      }
    }
    return this.colorStops[colorStopPercentage];
  }

  styleTimer() {
    return {
      position: 'absolute',
      left: '0',
      top: '0',
      transition: 'background-color 1s',
      width: this.progressPercentage + '%',
      overflow: 'hidden',
      padding: '0px',
      'background-color': this.currentColor,
      'min-height': '8px',
      'z-index': '9999',
      'white-space': 'nowrap',
      'border-radius': '10px',
    };
  }
}
