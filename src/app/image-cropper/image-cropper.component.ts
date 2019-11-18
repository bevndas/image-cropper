import {Component, ElementRef, OnInit, ViewChild, SimpleChanges, OnChanges} from '@angular/core';
import Cropper from 'cropperjs/dist/cropper.esm.js';
@Component({
  selector: 'image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  imageDestination: any;
  imageBase: any;
  cropper: Cropper;
  constructor() { }

  ngOnInit() {
  }
  fileChangeEvent(event) {
    this.imageDestination = event;
    this.readUpload();
  }
  readUpload() {
    const reader = new FileReader();
    reader.readAsDataURL(this.imageDestination.target.files[0]);
    reader.onload = () => {
      this.imageBase = reader.result;
      this.ctx = this.canvas.nativeElement.getContext('2d');
      const img = new Image();
      img.onload = () => {
        let height = img.height;
        let width = img.width;
        if (img.height > 500) {
          height = 500;
        }
          if (img.width > 700) {
              width = 700;
          }
        this.ctx.canvas.height = height;
        this.ctx.canvas.width = width;
        this.ctx.drawImage(img, 0, 0);
        this.cropper = new Cropper(this.canvas.nativeElement, {
          zoomable: false,
          scalable: false,
          aspectRatio: 1,
          crop() {
            const cropperData = this.cropper.getCroppedCanvas();
            const toBeSentImg = cropperData.toDataURL('image/png');
          }
        })
      }
      img.src = this.imageBase;
    }

  }
}
