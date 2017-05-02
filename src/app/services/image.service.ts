import {Injectable} from '@angular/core';
import {ImageModel} from "../models/image.model";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {

  constructor(private http: Http) {
  }

  public loadAllImages() {
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
      });
  }
}
