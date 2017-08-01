import {Injectable} from '@angular/core';
import {ImageModel} from "../models/image.model";
import {Http} from "@angular/http";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ImageService {
  private currentImage: Subject<ImageModel> = new Subject();
  private images: BehaviorSubject<ImageModel[]> = new BehaviorSubject<ImageModel[]>([]);

  constructor(private http: Http) {
    this.loadAllImages();
  }

  public loadAllImages() {
    let images = JSON.parse(localStorage.getItem('images'));

    if (images && images.length > 0) {
      let mapedImages = images.map(this.objectToImageModel);
      this.images.next(mapedImages);
    } else {
      this.http.get('./assets/data/imagesData.json')
        .map(response => {
          return response.json().images.map(this.objectToImageModel);
        })
        .subscribe(images => {
          this.images.next(images);
        })
    }
  }

  public getImages() {
    return this.images;
  }

  public addImage(image: ImageModel) {
    let images = this.images.getValue();
    images.push(image);

    this.images.next(images);
    this.saveImages();
  }

  private objectToImageModel(image) {
    return new ImageModel(
      image.imageSrc,
      image.likesCount,
      image.dislikesCount,
      image.comments
    );
  }

  public saveImages() {
    let images = this.images.getValue();
    localStorage.setItem('images', JSON.stringify(images));
  }

  public setCurrentImage(image: ImageModel) {
    this.currentImage.next(image);
  }

  public getCurrentImage() {
    return this.currentImage;
  }
}
