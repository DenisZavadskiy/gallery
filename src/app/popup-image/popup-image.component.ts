import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImageService} from "../services/image.service";
import {ImageModel} from "../models/image.model";
import {CommentModel} from "../models/comment.model";
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-popup-image',
  templateUrl: './popup-image.component.html',
  styleUrls: ['./popup-image.component.css'],
  animations: [
    trigger('popup', [
      transition('void => *', [
        style({ opacity: '0' }),
        animate(250, style({opacity: '1'}))
      ]),
      transition('* => void', [
        animate(250, style({opacity: '0'}))
      ])
    ])
  ]
})
export class PopupImageComponent implements OnInit {
  commentForm: FormGroup;
  popupOpened: boolean;
  image: ImageModel;
  like: boolean;
  dislike: boolean;

  constructor(fb: FormBuilder, public imageService: ImageService) {
    this.commentForm = fb.group({
      'nickname': ['', Validators.required],
      'commentContent': ['', Validators.required]
    });
    this.popupOpened = false;
    this.like = false;
    this.dislike = false;
  }

  toggleLike() {
    if(this.dislike) {
      this.image.reduceDislikesCount();
    }
    this.like = !this.like;
    this.dislike = false;
    this.like ? this.image.increaseLikesCount() : this.image.reduceLikesCount();
    this.imageService.saveImages();
  }

  toggleDislike() {
    if(this.like) {
      this.image.reduceLikesCount();
    }
    this.like = false;
    this.dislike = !this.dislike;
    this.dislike ? this.image.increaseDislikesCount() : this.image.reduceDislikesCount();
    this.imageService.saveImages();
  }

  addComment(value) {
    let comment: CommentModel = new CommentModel(value.commentContent, value.nickname);
    this.image.addComment(comment);

    this.commentForm.reset();
    this.imageService.saveImages();
  }

  closePopup() {
    this.commentForm.reset();
    this.popupOpened = false;
    this.like = false;
    this.dislike = false;
  }

  ngOnInit() {
    this.imageService.getCurrentImage()
      .subscribe(image => {
        this.image = image;
        this.popupOpened = true;
      })
  }
}
