import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {GalleryComponent} from './gallery/gallery.component';
import {ExpandedImageComponent} from './expanded-image/expanded-image.component';
import {ImageService} from "./services/image.service";
import {ImageComponent} from './image/image.component';
// import {MasonryModule} from 'angular2-masonry';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    ExpandedImageComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
