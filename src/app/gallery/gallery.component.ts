import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ImageModel} from "../models/image.model";
import {ImageService} from "../services/image.service";
import {trigger, style, animate, transition, state} from '@angular/animations';

declare let Packery: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [
    trigger('gallery', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', animate('500ms'))
    ])
  ]
})

export class GalleryComponent implements AfterViewChecked, OnInit {
  @ViewChild('packerygrid') grid;
  @ViewChild('packerygridwrapper') gridWrapper;
  images: ImageModel[];
  packery: any;
  public imagesLoaded: boolean = false;

  constructor(public imageService: ImageService) {
  }

  imageClick(image) {
    this.imageService.setCurrentImage(image);
  }

  public onImageAdd(event) {
    let reader = new FileReader();

    if (event.srcElement.files.length > 0) {
      reader.readAsDataURL(event.srcElement.files[0]);
    }

    reader.onload = (ev: any) => {
      let galleryImage: ImageModel = new ImageModel(ev.target.result);
      this.imageService.addImage(galleryImage);
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
    this.imageService.getImages()
      .subscribe(images => {
        this.images = images;
        this.imagesLoaded = true;
      });

    this.gridWrapper.nativeElement.onmousewheel = (e) => {
      this.gridWrapper.nativeElement.scrollLeft -= e.wheelDelta;
    };
  }
}
