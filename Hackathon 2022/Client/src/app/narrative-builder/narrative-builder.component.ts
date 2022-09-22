import { ThisReceiver } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { PlayData } from '../interfaces/play-data';
import { ComposerService } from '../services/composer.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-narrative-builder',
  templateUrl: './narrative-builder.component.html',
  styleUrls: ['./narrative-builder.component.css']
})
export class NarrativeBuilderComponent implements OnInit {
  frameNumber: number = -1;
  tagNumber: number = 0;
  key: string = 'key';
  imagesSelected: boolean[] = [];
  listening: boolean = false;
  playData: PlayData = { frames: [], name: '', description: '' };
  formProgress: number = 0;
  classifyName: string = '';

  doEnabled: boolean = true;
  whatChooseEnabled: boolean = true;

  do: string = '';
  what: string = '';
  tag1: string = '';
  tag2: string = '';
  key1: string = '';
  key2: string = '';
  repeat: string = '';

  constructor(
    private image: ImageService,
    private composer: ComposerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.classifyName = this.composer.getClassification();
    this.addFrame();
  }

  onDoChange(verb: any): void {
    if (verb === 'Show' && this.doEnabled) {
      this.formProgress = 1;
      this.doEnabled = false;
      this.do = verb;
    }
  }

  onWhatChange(what: any): void {
    if (what === 'Random Image' && this.whatChooseEnabled) {
      this.formProgress = 2;
      this.whatChooseEnabled = false;
      this.what = what;
    }
  }

  addFrame() {
    this.frameNumber++;
    this.playData.frames.push({ frameNumber: this.frameNumber, repeat: 0, contents: [], tags: [{ tag: '', key: '' }, { tag: '', key: '' }] });
  }

  selectKey() {
    this.playData.frames[this.frameNumber].tags[this.tagNumber].key = 'Listening...';
    this.listening = true;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) {
    if (!this.listening || this.tagNumber > 1) return;

    this.listening = false;
    this.key = this.playData.frames[this.frameNumber].tags[this.tagNumber].key = event.code;
    this.tagNumber++;
    this.formProgress++;
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUpEvent(event: KeyboardEvent) {
    this.listening = false;
  }

  onMultipleFileSelectedCounter: number = 0;
  async onMultipleFileSelected(event: any) {
    for (let file of event.target.files) {
      let file64 = await this.image.toBase64(file);
      this.playData.frames[this.frameNumber].contents.push({
        type: "image",
        props: {
          contents: file64,
          tagIndex: this.onMultipleFileSelectedCounter
        }
      })
      //this.files64.push(file64);
    }
    this.onMultipleFileSelectedCounter++;
    this.imagesSelected.push(true);
    this.formProgress++;
  }

  // async onSingleFileSelected(event: any) {
  //   const file:File = event.target.files[0];

  //   if (file) {
  //     this.imagesSelected = true;
  //     // this.file64 = await this.image.toBase64(file);
  //     // this.fileName = file.name;
  //   }
  // }

  onTag1Changed($event: any) {
    if (this.formProgress > 4) return;

    this.playData.frames[this.frameNumber].tags[0].tag = $event.target.value;
    this.formProgress = 4;
  }

  onTag2Changed($event: any) {
    this.playData.frames[this.frameNumber].tags[1].tag = $event.target.value;
    this.formProgress = 6;
  }

  onRepeatChanged($event: any) {
    this.playData.frames[this.frameNumber].repeat = Number.parseInt($event.target.value);
    this.formProgress = 9;
  }

  async done(): Promise<string> {
    let result = await this.composer.composeFromPlayData(this.playData);
    console.log(result);

    window.open(`http://localhost:4200/play/${result}/${this.classifyName}`, "_blank");

    return result;
  }
}
