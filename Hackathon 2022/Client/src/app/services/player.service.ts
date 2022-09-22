import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, concatMap, first, lastValueFrom } from 'rxjs';
import { Frame, PlayData } from '../interfaces/play-data';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private frames: Frame[] = [];
  private currentFrame: number = 0;
  private countInFrame: number = 0;

  constructor(private http: HttpClient) { }

  async play(filename: string): Promise<PlayData> {
    const source$ = this.http.get(`http://localhost:2020/play/${filename}`, {}).pipe(
      first(),
      map((json) => JSON.parse(<string>json) as PlayData),
      map((playData) => playData));

    let playData = await lastValueFrom(source$);
    this.frames = playData.frames;
    return playData;
  }

  next(): [number, number] {
    if (this.countInFrame < this.current().repeat)
    {
      this.countInFrame++;
      return [this.countInFrame, this.currentFrame];
    }

    this.currentFrame = 0;
    this.currentFrame++;

    return [this.countInFrame, this.currentFrame];
  }

  current(): Frame {
    return this.frames[this.currentFrame];
  }

  public isPlaying() {
    return this.currentFrame < this.frames.length && this.countInFrame < this.current().repeat;
  }
}
