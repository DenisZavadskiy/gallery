import {Component, OnInit} from '@angular/core';
import {ImageModel} from "../models/image.model";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  inputs: ['images']
})
export class GalleryComponent implements OnInit {
  images: ImageModel[];

  constructor() {
  }

  imageClick(image) {
    console.log(image);
  }

  ngOnInit() {
  }

}
