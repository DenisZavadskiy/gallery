import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {GalleryComponent} from './gallery/gallery.component';
import {ImageService} from "./services/image.service";
import {PopupImageComponent} from './popup-image/popup-image.component';
import {FromNowPipe} from './pipes/from-now.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PopupImageComponent,
    FromNowPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
