import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { defaultGetImage, GetImage } from '../interfaces/get-image';
import { ITrigger, KeyPressedTrigger } from '../interfaces/trigger';
import { TriggerService } from '../services/trigger.service';

@Component({
  selector: 'display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.css']
})
export class DisplayImageComponent {
  constructor(private http: HttpClient, private triggers: TriggerService) {}

  image: GetImage = defaultGetImage;

  generateImageStyle(): string {
    const x = this.image.props.position?.x;
    const y = this.image.props.position?.y;
    const dx = this.image.props.dimensions?.x;
    const dy = this.image.props.dimensions?.y;
    let str = `position: absolute;`
    if (x !== undefined && y !== undefined) {
      str += ` left: ${x}px; top: ${y}px;`;
    }

    if (dx !== undefined && dy !== undefined) {
      str += `width: ${dx}px; height: ${dy}px;`;
    }
    else
    {
      str += 'width: auto; height: auto;';
    }
    return str;
  }

  addKeyPressedTrigger(frameNumber: number, callback?: (payload: string) => void): ITrigger {
    let t = KeyPressedTrigger.create(frameNumber, ['Escape', 'Space'], callback);
    this.triggers.addTrigger(t);
    return t;
  }
}