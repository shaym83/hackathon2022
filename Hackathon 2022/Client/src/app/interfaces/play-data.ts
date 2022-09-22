import { GetImage } from "./get-image";

export interface Frame {
    frameNumber: number;
    repeat: number;
    contents: GetImage[];
    tags: {
        tag: string;
        key: string;
    }[];
}

export interface PlayData {
    frames: Frame[];
    name: string;
    description: string;
}