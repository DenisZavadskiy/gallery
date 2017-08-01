export class CommentModel {
  private author: string;
  private date: any;
  private content: string;

  constructor(content: string, author?: string, date?: any){
    this.author = author.length && author || 'Anonymous';
    this.date = date || new Date();
    this.content = content;
  }

  public getAuthor() {
    return this.author;
  }

  public getDate() {
    return this.date;
  }

  public getContent() {
    return this.content;
  }
}
