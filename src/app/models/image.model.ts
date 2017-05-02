import {CommentModel} from "./comment.model";

export class ImageModel {
  private image: HTMLImageElement;
  private likesCount: number;
  private dislikesCount: number;
  private comments: CommentModel[];
  private type: string;

  constructor(source: string, likesCount?: number, dislikesCount?: number, comments?: any[]) {
    this.image = new Image();
    this.image.src = source;
    this.setType();
    this.likesCount = likesCount || 0;
    this.dislikesCount = dislikesCount || 0;
    this.comments = comments && comments.map(comment => {
        return new CommentModel(
          comment.content,
          comment.author,
          comment.date
        );
      }) || [];
  }

  public like() {
    this.likesCount++;
  }

  public dislike() {
    this.dislikesCount++;
  }

  public addComment(comment: CommentModel) {
    this.comments.push(comment);
  }

  public getSource() {
    return this.image.src;
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

  private setType() {
    let ratio = this.image.width / this.image.height;

    console.log(ratio);

    if(ratio < 0.75){
      this.type = "portrait-item";
    } else {
      switch (Math.round(ratio)) {
        case 1:
          this.type = "square-item";
          break;
        default:
          this.type = "wide-screen-item";
          break;
      }
    }
    console.log(this.type);
  }
}
