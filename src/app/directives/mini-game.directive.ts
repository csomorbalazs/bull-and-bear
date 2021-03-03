import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { GameState } from '../models/GameState';

@Directive({
  selector: '[miniGame]'
})
export class MiniGameDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>) { }

  @Input() set miniGame(state: GameState) {
    if (state === GameState.MINIGAME) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainerRef.clear();
    }
  }
}
