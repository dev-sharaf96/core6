export class images {
    imageData: string;
    newImageData: string
    constructor(
        imageData: string,
        newImageData ?: string
    ) {

      this.imageData = imageData || null;
      this.newImageData = newImageData ||null
    }
  }
