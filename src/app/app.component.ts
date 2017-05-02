import {Component, OnInit} from '@angular/core';
import {ImageService} from "./services/image.service";
import {ImageModel} from "./models/image.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  images: ImageModel[];
  imgSrc = "";

  constructor(public imageService: ImageService) {
  }

  public onChange(event) {
    let reader = new FileReader();

    reader.readAsDataURL(event.srcElement.files[0]);

    reader.onload = (ev: any) => {
      this.imgSrc = ev.target.result;
      let image = new Image();

      image.src = this.imgSrc;

      console.info("width", image.width);
      console.info("height", image.height);
    }
  }

  ngOnInit() {
    this.imageService.loadAllImages()
      .subscribe(response => {
        this.images = response;
      })
  }
}
