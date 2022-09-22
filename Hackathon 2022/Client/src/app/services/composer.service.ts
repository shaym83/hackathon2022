import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetImage } from '../interfaces/get-image';
import { PlayData } from '../interfaces/play-data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComposerService {
  currentFrame: number = -1;
  composedJson: string = '';
  playData: PlayData = { frames: [], name: '', description: '' };
  name: string = '';
  description: string = '';
  classification: string ='';
  frames: Map<number, string[]>;

  constructor(private http: HttpClient) {
    this.frames = new Map<number, string[]>();
    this.frames.set(0, []);

    this.addFrame();
  }

  set(json: string) {
    this.frames.set(this.currentFrame, [json]);
  }

  add(json: string, image: GetImage) {
    let current = this.frames.get(this.currentFrame) ?? [];
    this.frames.set(this.currentFrame, current.concat(json));

    this.playData.frames[this.currentFrame].contents.push(image);
  }

  async composeFromPlayData(playData: PlayData): Promise<string> {
    this.playData = playData;
    this.playData.name = this.name;
    this.playData.description = this.description;
    return await this.compose();
  }

  setNameAndDescription(name: string, desc: string) {
    this.name = name;
    this.description = desc;
  }

  setClassification(classify: string) {
    this.classification = classify;
  }

  getClassification() {
    return this.classification;
  }

  addFrame() {
    this.currentFrame++;
    this.playData.frames.push({ frameNumber: this.currentFrame, contents: [], repeat: 0, tags: [] });
  }

  setRepeat(repeat: number) {
    this.playData.frames[this.currentFrame].repeat += repeat;
  }

  addTag(tag: string, key: string) {
    this.playData.frames[this.currentFrame].tags.push({ tag, key });
  }

  toJson(): string {
    return JSON.stringify(this.playData);
  }

  async compose(): Promise<string> {
    let upload$ =  this.http.post("http://localhost:2020/upload", this.toJson(), { headers: { "Content-Type": "application/json" } });
    let result = await firstValueFrom(upload$) as { location: string };
    return result.location;
  }
}
