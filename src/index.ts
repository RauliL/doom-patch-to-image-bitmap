import { Color, IndexedImage } from "@rauli/wad";

export const doomPatchToImageBitmap = (
  context: CanvasRenderingContext2D,
  patch: IndexedImage,
  colormap: Uint8Array,
  palette: Color[]
): Promise<ImageBitmap> => {
  const { data, height, width } = patch;
  const image = context.createImageData(width, height);

  for (let i = 0, j = 0; i < data.length; ++i, j += 4) {
    const index = data[i];
    let r: number;
    let g: number;
    let b: number;
    let a: number;

    // TODO: While many WAD editors treat index 247 as transparent pixel, this
    // is really not the case.
    if (index === 247) {
      r = 255;
      g = 255;
      b = 255;
      a = 0;
    } else {
      const color = palette[colormap[index]];

      if (!color) {
        return Promise.reject(new Error("Unable to render patch"));
      }
      r = color.r;
      g = color.g;
      b = color.b;
      a = 255;
    }

    image.data[j] = r;
    image.data[j + 1] = g;
    image.data[j + 2] = b;
    image.data[j + 3] = a;
  }

  return createImageBitmap(image);
};
