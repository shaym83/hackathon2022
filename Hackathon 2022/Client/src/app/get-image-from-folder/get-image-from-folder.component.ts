import { Component, Input, OnInit } from '@angular/core';
import { ComposerService } from '../services/composer.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-get-image-from-folder',
  templateUrl: './get-image-from-folder.component.html',
  styleUrls: ['./get-image-from-folder.component.css']
})
export class GetImageFromFolderComponent implements OnInit {
  files64: string[] = [];
  imagesSelected: boolean = false;
  addStatus = 'Add';
  selectedKey = 'Escape';

  constructor(
    private image: ImageService,
    private composer: ComposerService) { }

  ngOnInit(): void {
  }

  async onFileSelected(event: any) {
    for (let file of event.target.files)
    {
      let file64 =  await this.image.toBase64(file);
      this.files64.push(file64);
    }
    this.imagesSelected = true;
  }

  onAdd(tag: string, count: string) {
    for (let file64 of this.files64) {
      let json = this.image.toJsonDimensionless(file64, this.selectedKey, tag);
      this.composer.add(json, { type: "image", props: { tagIndex: 0, contents: file64}});
    }

    this.composer.setRepeat(Number.parseInt(count));
    this.composer.addTag(tag, this.selectedKey);
    this.addStatus = 'Added';
  }
}
