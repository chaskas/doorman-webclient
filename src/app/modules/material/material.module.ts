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
import { MdDatepickerModule } from '@angular/material';
import { MdNativeDateModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdSnackBarModule } from '@angular/material';

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
    MdProgressBarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdTabsModule,
    FlexLayoutModule,
    MdSnackBarModule
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
    MdProgressBarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdTabsModule,
    FlexLayoutModule,
    MdSnackBarModule
  ],
  declarations: []
})
export class MaterialModule { }
