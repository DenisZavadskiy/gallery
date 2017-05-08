import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ImageModel} from "../models/image.model";
import {ImageService} from "../services/image.service";
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

declare let Packery: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [
    trigger('gallery', [
      transition('void => *', [
        style({opacity: '0'}),
        animate(1000, style({opacity: '1'}))
      ]),
    ])
  ]
})
export class GalleryComponent implements AfterViewChecked, OnInit {
  @ViewChild('packerygrid') grid;
  images: ImageModel[];
  packery: any;

  constructor(public imageService: ImageService) {
  }

  imageClick(image) {
    this.imageService.setCurrentImage(image);
  }

  public onChange(event) {
    let reader = new FileReader();
    reader.readAsDataURL(event.srcElement.files[0]);

    reader.onload = (ev: any) => {
      let galleryImage: ImageModel = new ImageModel(ev.target.result);
      this.images.push(galleryImage);

      localStorage.setItem('images', JSON.stringify(this.images));
    }
  }

  ngAfterViewChecked() {
    this.packery = new Packery(this.grid.nativeElement, {
      itemSelector: '.packery-grid-item',
      gutter: 10,
      horizontal: true
    });
  }

  ngOnInit() {
    this.imageService.loadAllImages()
      .subscribe(images => {
        this.images = images;
      })
  }
}
