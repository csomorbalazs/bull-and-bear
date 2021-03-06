import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../../models/Character';

@Component({
  selector: 'lesson-screen',
  templateUrl: './lesson-screen.component.html',
  styleUrls: ['./lesson-screen.component.scss'],
})
export class LessonScreenComponent implements OnInit {
  Character = Character;

  @Input() text: string = "";
  @Input() character: Character;
  @Output() lessonViewed = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }
}
