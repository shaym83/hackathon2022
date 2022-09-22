import { Injectable } from '@angular/core';

export interface ImagePreJSon
{
    type: string;
    props: {
      key: string;
      tag: string;
      dimensions?: {
        x: number;
        y: number;
      };
      position?: {
        x: number;
        y: number;
      };
      contents: string;
    }
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(<string>reader.result);
    reader.onerror = error => reject(error);
  });

  toJson = (file64: string, dimX: string, dimY: string, posX: string, posY: string, key: string, tag: string) =>  {
    var preJson: ImagePreJSon = {
      type: "image",
      props: {
        key: key,
        tag: tag,
        dimensions: {
          x: Number.parseInt(dimX),
          y: Number.parseInt(dimY)
        },
        position: {
          x: Number.parseInt(posX),
          y: Number.parseInt(posY)
        },
        contents: file64
      }
    }

    return JSON.stringify(preJson);
  };

  toJsonDimensionless = (file64: string, key: string, tag: string) =>  {
    var preJson: ImagePreJSon = {
      type: "image",
      props: {
        tag: tag,
        key: key,
        contents: file64
      }
    }

    return JSON.stringify(preJson);
  };
}
