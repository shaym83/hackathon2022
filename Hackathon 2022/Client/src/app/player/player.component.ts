import { Component, ComponentFactoryResolver, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GetImage } from '../interfaces/get-image';
import { Frame } from '../interfaces/play-data';
import { PlayerService } from '../services/player.service';
import { TrackService } from '../services/track.service';
import { TriggerService } from '../services/trigger.service';
import { DisplayImageComponent } from '../display-image/display-image.component';
import { ActivatedRoute } from '@angular/router';

const componentsRegistry = {
  'DisplayImageComponent': DisplayImageComponent
};

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  frameNumber: number = 0;
  numberInFrame: number = 0;
  totalFrames: number = 0;
  totalInFrame: number = 0;
  tags: { tag: string, key: string }[] = [];
  filename: string = '';
  userId: string = '';
  experimentName: string = '';
  experimentDescription: string = '';
  private listenToKeyDown: boolean = true;
  @ViewChild('content', { read: ViewContainerRef }) content?: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private componentFactory: ComponentFactoryResolver,
    private playerService: PlayerService,
    private triggers: TriggerService,
    private track: TrackService) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) {
    if (!this.listenToKeyDown) return;

    this.listenToKeyDown = false;
    this.triggers.onKeyPressed(event.code);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUpEvent(event: KeyboardEvent) {
    this.listenToKeyDown = true;
  }

  async ngOnInit(): Promise<void> {
    this.filename = this.route.snapshot.paramMap.get('filename') ?? '';
    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';

    let playData = await this.playerService.play(this.filename);
    this.experimentName = playData.name;
    this.experimentDescription = playData.description;
    this.totalFrames = playData.frames.length;
    this.totalInFrame = this.playerService.current().repeat;
    this.renderCurrentFrame();
  }

  createImage(frame: Frame, image: GetImage) {
    const factory = this.componentFactory.resolveComponentFactory(componentsRegistry['DisplayImageComponent']);
    this.content?.clear();
    let setImageComponentRef = this.content?.createComponent(factory);
    if (setImageComponentRef) {
      const startTime = performance.now();
      setImageComponentRef.instance.image = image;
      let trigger = setImageComponentRef.instance.addKeyPressedTrigger(frame.frameNumber, (payload) => {
        const totalTime = performance.now() - startTime;
        const key = frame.tags[image.props.tagIndex].key;
        const tag = frame.tags[image.props.tagIndex].tag;
        const success = key === payload;
        this.track.track(`{ "payload": "${this.userId},${frame.frameNumber},${tag},${success},${totalTime}" }`, this.filename);

        this.triggers.removeTrigger(trigger);

        [this.numberInFrame, this.frameNumber] = this.playerService.next();
        this.totalInFrame = this.playerService.current().repeat;

        if (this.playerService.isPlaying()) {
          this.renderCurrentFrame();
        } else {
          this.content?.clear();
        }
      });
    }
  }

  renderCurrentFrame() {
    const frame = this.playerService.current();
    this.tags = frame.tags;
    let item = frame.contents[Math.floor(Math.random() * frame.contents.length)];
    switch (item.type) {
      case 'image': {
        this.createImage(frame, item);
        break;
      }
      default: {
        // unexpected
      }
    }
  }

  isPlaying() {
    return this.frameNumber < this.totalFrames && this.numberInFrame < this.totalInFrame;
  }
}
