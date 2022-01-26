# doom-patch-to-image-bitmap

Converts [DOOM patch] into [ImageBitmap] instance that can be then rendered to
[canvas].

[doom patch]: https://doomwiki.org/wiki/Patch
[imagebitmap]: https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
[canvas]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

## Installation

```sh
$ npm install --save doom-patch-to-image-bitmap
```

## Usage

This NPM package provides single function called `doomPatchToImageBitmap`. The
function takes [2D context] of an canvas, DOOM patch, DOOM colormap and DOOM
palette provided by [@rauli/wad] library and returns an promise that will
resolve into [ImageBitmap] instance if the given patch can be rendered with the
given colormap and palette.

[@rauli/wad]: https://www.npmjs.com/package/@rauli/wad

```typescript
import { createObjectModel, readWad } from "@rauli/wad";
import { doomPatchToImageBitmap } from "doom-patch-to-image-bitmap";

const model = createObjectModel(readWad(...));
const context = document.querySelector("canvas").getContext("2d");

doomPatchToImageBitmap(
  context,
  model.sprites.PLAYB1,
  model.colormap[0],
  model.playpal[0]
).then((bitmap) => {
  context.drawImage(bitmap, 0, 0);
});
```
