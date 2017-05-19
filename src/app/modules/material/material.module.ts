import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdToolbarModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdGridListModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { MdProgressBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdGridListModule,
    MdDialogModule,
    MdInputModule,
    MdSelectModule,
    MdProgressBarModule
  ],
  exports: [
    BrowserAnimationsModule,
    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdGridListModule,
    MdDialogModule,
    MdInputModule,
    MdSelectModule,
    MdProgressBarModule
  ],
  declarations: []
})
export class MaterialModule { }
