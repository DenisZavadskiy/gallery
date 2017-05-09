import {CommentModel} from "./comment.model";

export class ImageModel {
  private imageSrc: string;
  private likesCount: number;
  private dislikesCount: number;
  private comments: CommentModel[];
  private type: string;

  constructor(source: string, likesCount?: number, dislikesCount?: number, comments?: any[]) {
    this.imageSrc = source;
    this.likesCount = likesCount || 0;
    this.dislikesCount = dislikesCount || 0;
    this.comments = comments && comments.map(comment => {
        return new CommentModel(
          comment.content,
          comment.author,
          comment.date
        );
      }) || [];
    this.setType();
  }

  public increaseLikesCount() {
    this.likesCount++;
  }

  public reduceLikesCount() {
    this.likesCount--;
  }

  public increaseDislikesCount() {
    this.dislikesCount++;
  }

  public reduceDislikesCount() {
    this.dislikesCount--;
  }

  public addComment(comment: CommentModel) {
    this.comments.push(comment);
  }

  public getSource() {
    return this.imageSrc;
  }

  public getLikesCount() {
    return this.likesCount;
  }

  public getDislikesCount() {
    return this.dislikesCount;
  }

  public getCommentsCount() {
    return this.comments.length;
  }

  public getType() {
    return this.type;
  }

  public getImageComments() {
    return this.comments;
  }

  private setType() {
    let image = new Image();
    image.src = this.imageSrc;

    image.onload = (ev: any) => {
      let ratio = image.width / image.height;

      if (ratio < 0.75) {
        this.type = "portrait-item";
      } else {
        this.type = Math.round(ratio) === 1 ? "square-item" : "wide-screen-item";
      }
    };
  }
}
