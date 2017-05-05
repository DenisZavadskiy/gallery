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
  public images: ImageModel[];
  private currentImage: Subject<ImageModel>;

  constructor(private http: Http) {
    this.currentImage = new Subject();
  }

  public loadAllImages() {
    if (this.images) {
      return Observable.of(this.images);
    } else {
      return this.http.get('assets/data/imagesData.json')
        .map(response => {
          return response.json().images.map(image => {
            return new ImageModel(
              image.src,
              image.likesCount,
              image.dislikesCount,
              image.comments
            );
          });
        })
        .do(data => {
          this.images = data;
        })
    }
  }

  public setCurrentImage(image: ImageModel) {
    this.currentImage.next(image);
  }

  public getCurrentImage() {
    return this.currentImage;
  }
}
