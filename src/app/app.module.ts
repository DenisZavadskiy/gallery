import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {GalleryComponent} from './gallery/gallery.component';
import {ImageService} from "./services/image.service";
import {ImageComponent} from './image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
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
