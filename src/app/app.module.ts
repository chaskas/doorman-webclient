import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppConfig } from './config/app.config';

import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';


import { MaterialModule } from './modules/material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { MemberService} from './services/member.service';
import { EventService } from './services/event.service';
import { GuestService } from './services/guest.service';
import { DialogsServiceService } from './services/dialogs-service.service';

import { EventNewComponent } from './components/events/event-new/event-new.component';
import { EventShowComponent } from './components/events/event-show/event-show.component';
import { MemberNewComponent } from './components/member/member-new/member-new.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';
import { MemberListInvitadosComponent } from './components/member/member-list/member-list-invitados/member-list-invitados.component';
import { MemberShowComponent } from './components/member/member-show/member-show.component';

import { DialogComponent } from './utils/dialog/dialog.component';
import { GuestAddComponent } from './components/guests/guest-add/guest-add.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CalendarComponent,
    EventNewComponent,
    EventShowComponent,
    MemberNewComponent,
    MemberListComponent,
    MemberEditComponent,
    MemberListInvitadosComponent,
    MemberShowComponent,
    DialogComponent,
    GuestAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [EventNewComponent, GuestAddComponent, DialogComponent],
  providers: [AppConfig, EventService, MemberService, GuestService, DialogsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
