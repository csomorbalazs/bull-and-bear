import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../../models/Character';

@Component({
  selector: 'lesson-screen',
  templateUrl: './lesson-screen.component.html',
  styleUrls: ['./lesson-screen.component.scss'],
})
export class LessonScreenComponent implements OnInit {
  Character = Character;
  Array = Array;

  @Input() text: string | string[] = "";
  @Input() character: Character;
  @Output() lessonViewed = new EventEmitter<void>();

  currentTextIndex = 0;

  constructor() { }

  ngOnInit(): void { }

  onNextPressed(): void {
    if (Array.isArray(this.text)) {
      if (this.currentTextIndex === this.text.length - 1) {
        this.lessonViewed.emit();
      } else {
        this.currentTextIndex++;
      }
    } else {
      this.lessonViewed.emit();
    }
  }
}
