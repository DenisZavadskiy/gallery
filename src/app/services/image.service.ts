import {Injectable} from '@angular/core';
import {ImageModel} from "../models/image.model";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/do';

@Injectable()
export class ImageService {
  private currentImage: Subject<ImageModel>;

  constructor(private http: Http) {
    this.currentImage = new Subject();
  }

  public loadAllImages() {
    let images = JSON.parse(localStorage.getItem('images'));

    if (images) {
      return Observable.of(images.map(this.objectToImageModel));
    } else {
      return this.http.get('./assets/data/imagesData.json')
        .map(response => {
          return response.json().images.map(this.objectToImageModel);
        });
    }
  }

  private objectToImageModel(image) {
    return new ImageModel(
      image.imageSrc,
      image.likesCount,
      image.dislikesCount,
      image.comments
    );
  }

  public setCurrentImage(image: ImageModel) {
    this.currentImage.next(image);
  }

  public getCurrentImage() {
    return this.currentImage;
  }
}
