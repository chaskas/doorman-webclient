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

import { MemberService} from './services/member.service';
import { EventService } from './services/event.service';
import { EventNewComponent } from './components/events/event-new/event-new.component';
import { MemberNewComponent } from './components/member/member-new/member-new.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CalendarComponent,
    EventNewComponent,
    MemberNewComponent,
    MemberListComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    MaterialModule
  ],
  entryComponents: [EventNewComponent],
  providers: [AppConfig, EventService,MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
