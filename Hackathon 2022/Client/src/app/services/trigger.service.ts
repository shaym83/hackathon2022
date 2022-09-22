import { Injectable } from '@angular/core';
import { ITrigger, KeyPressedTrigger } from '../interfaces/trigger';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {
  currentFrame: number = 0;
  triggers: Map<number, ITrigger[]>;

  constructor() {
    this.triggers = new Map<number, ITrigger[]>();
  }

  addTrigger(trigger: ITrigger) {
    let frameTriggers = this.triggers.get(trigger.frame) ?? [];
    frameTriggers.push(trigger);
    this.triggers.set(trigger.frame, frameTriggers);
  }

  removeTrigger(trigger: ITrigger) {
    let frameTriggers = this.triggers.get(trigger.frame) ?? [];
    const index = frameTriggers.indexOf(trigger);
    if (index > -1) { // only splice array when item is found
      frameTriggers.splice(index, 1); // 2nd parameter means remove one item only
    }
    this.triggers.set(trigger.frame, frameTriggers);
  }

  onKeyPressed(key: string) {
    let frameTriggers = this.triggers.get(this.currentFrame);
    if (!frameTriggers) return;

    for (let t of frameTriggers) {
      if (!(t instanceof KeyPressedTrigger))
        continue;

      var k = t as KeyPressedTrigger;
      if (k.evaluate(key)) {
        console.log(`${t.name} triggered`);
        if (t.callback) t.callback(key);
      }
    }
  }
}
