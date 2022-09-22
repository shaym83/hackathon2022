import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetImageComponent } from './get-image/get-image.component';
import { DisplayImageComponent } from './display-image/display-image.component';
import { TriggerService } from './services/trigger.service';

import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClassificationBuilderComponent } from './classification-builder/classification-builder.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ClassificationPlayerComponent } from './classification-player/classification-player.component';

import { PlayerService } from './services/player.service';
import { PlayerComponent } from './player/player.component';
import { GetImageFromFolderComponent } from './get-image-from-folder/get-image-from-folder.component';
import { ImageService } from './services/image.service';
import { NarrativeBuilderComponent } from './narrative-builder/narrative-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    GetImageComponent,
    ClassificationBuilderComponent,
    PlayerComponent,
    ClassificationPlayerComponent,
    DisplayImageComponent,
    PlayerComponent,
    GetImageFromFolderComponent,
    NarrativeBuilderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTabsModule,
    MatRadioModule
  ],
  providers: [
    TriggerService,
    PlayerService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
