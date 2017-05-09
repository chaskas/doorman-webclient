import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppConfig } from './config/app.config';

import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';

import { MaterialModule } from './modules/material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { EventService } from './services/event.service';
import { EventNewComponent } from './components/events/event-new/event-new.component';
import { MemberNewComponent } from './components/member/member-new/member-new.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CalendarComponent,
    EventNewComponent,
    MemberNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    MaterialModule
  ],
  entryComponents: [EventNewComponent],
  providers: [AppConfig, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
