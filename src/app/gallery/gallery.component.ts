import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ImageModel} from "../models/image.model";
declare let Packery: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  inputs: ['images']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('packerygrid') grid;
  images: ImageModel[];

  constructor() {
  }

  imageClick(image) {
    console.log(image);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let packery = new Packery(this.grid.nativeElement, {
      itemSelector: '.packery-grid-item',
      gutter: 10,
      horizontal: true
    });
  }
}
