import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lesson-screen',
  templateUrl: './lesson-screen.component.html',
  styleUrls: ['./lesson-screen.component.scss']
})
export class LessonScreenComponent implements OnInit {
  @Output() onLessonViewed = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

}