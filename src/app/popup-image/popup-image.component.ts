import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImageService} from "../services/image.service";
import {ImageModel} from "../models/image.model";
import {CommentModel} from "../models/comment.model";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

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

  constructor(fb: FormBuilder, public imageService: ImageService) {
    this.commentForm = fb.group({
      'nickname': ['', Validators.required],
      'commentContent': ['', Validators.required]
    });
  }

  addComment(value) {
    let comment: CommentModel = new CommentModel(value.commentContent, value.nickname);
    this.image.addComment(comment);
    this.commentForm.reset();
  }

  closePopup() {
    this.commentForm.reset();
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
