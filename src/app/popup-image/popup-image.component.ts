import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImageService} from "../services/image.service";
import {ImageModel} from "../models/image.model";

@Component({
  selector: 'app-popup-image',
  templateUrl: './popup-image.component.html',
  styleUrls: ['./popup-image.component.css']
})
export class PopupImageComponent implements OnInit {
  commentForm: FormGroup;
  popupOpened: boolean;
  image: ImageModel;

  constructor(fb: FormBuilder,
              public imageService: ImageService) {
    this.commentForm = fb.group({
      'nickname': ['', Validators.required],
      'commentContent': ['', Validators.required]
    });
  }

  addComment(value) {
    console.log(value);
  }

  closePopup() {
    this.popupOpened = false;
  }

  ngOnInit() {
    this.popupOpened = false;
    this.imageService.getCurrentImage()
      .subscribe(image => {
        this.image = image;
        this.popupOpened = true;
      })
  }

}
