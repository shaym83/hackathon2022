import { Component, OnInit } from '@angular/core';
import { ComposerService } from '../services/composer.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'get-image',
  templateUrl: './get-image.component.html',
  styleUrls: ['./get-image.component.css']
})
export class GetImageComponent implements OnInit {

  constructor(
    private composer: ComposerService,
    private image: ImageService) {}

  fileName = '';
  addStatus = 'Add';

  private file64: string = '';

  async onFileSelected(event: any) {
      const file:File = event.target.files[0];

      if (file) {
        this.file64 = await this.image.toBase64(file);
        this.fileName = file.name;
      }
  }

  onAdd(dimX: string, dimY: string, posX: string, posY: string, key: string, tag: string) {
    const json = this.image.toJson(this.file64, dimX, dimY, posX, posY, key, tag);
    this.composer.set(json);
    this.addStatus = 'Added';
  }

  ngOnInit(): void {
  }

}
