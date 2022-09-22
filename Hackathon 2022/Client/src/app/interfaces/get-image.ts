export interface GetImage {
    type: string;
    props: {
      tagIndex: number;
      position?: { x: number, y: number };
      dimensions?: { x: number, y: number };
      contents: string;
    },
  }

export const defaultGetImage: GetImage = {
  type: "image",
  props: {
    tagIndex: 0,
    position: { x: 0, y: 0},
    dimensions: {x: 0, y: 0},
    contents: ''
  },
};