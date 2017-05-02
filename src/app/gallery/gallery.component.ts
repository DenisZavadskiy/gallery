import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ImageModel} from "../models/image.model";
declare let Packery: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  inputs: ['images']
})
export class GalleryComponent implements AfterViewChecked{
  @ViewChild('packerygrid') grid;
  images: ImageModel[];
  packery: any;


  constructor() {
  }

  imageClick(image) {
    console.log(image);
  }

  public onChange(event) {
    let reader = new FileReader();

    reader.readAsDataURL(event.srcElement.files[0]);

    reader.onload = (ev: any) => {
      let image = new Image();
      image.src = ev.target.result;

      image.onload = (ev: any) => {
        let galleryImage: ImageModel = new ImageModel(image.src);
        this.images.push(galleryImage);
      };
    }
  }

  ngAfterViewChecked() {
    this.packery = new Packery(this.grid.nativeElement, {
      itemSelector: '.packery-grid-item',
      gutter: 10,
      horizontal: true
    });
  }
}
