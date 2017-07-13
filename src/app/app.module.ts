import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LOCALE_ID } from '@angular/core';

import { AppConfig } from './config/app.config';

import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';

import { MaterialModule } from './modules/material/material.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { MemberService} from './services/member.service';
import { StatisticsService} from './services/statistics.service';
import { EventService } from './services/event.service';
import { GuestService } from './services/guest.service';
import { DialogsServiceService } from './services/dialogs-service.service';
import { SessionService } from './services/session.service';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';

import { EventNewComponent } from './components/events/event-new/event-new.component';
import { EventShowComponent } from './components/events/event-show/event-show.component';

import { MemberNewComponent } from './components/member/member-new/member-new.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';
import { MemberShowComponent } from './components/member/member-show/member-show.component';

import { PeopleDatabase } from './components/member/member-list/people-database';
import { UsersDatabase } from './components/users/users-list/users-database';

import { GuestAddComponent } from './components/guests/guest-add/guest-add.component';

import { DialogComponent } from './utils/dialog/dialog.component';
import { CustomValidators } from 'ng2-validation';
import { Ng2Rut, RutValidator } from './utils/rut/ng2-rut.module';
import { ChartsModule } from 'ng2-charts';
import { Angular2TokenService } from 'angular2-token';
import { LoginComponent } from './components/session/login/login.component';
import { RegisterComponent } from './components/session/register/register.component';
import { LogoutComponent } from './components/session/logout/logout.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';

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
    MemberShowComponent,
    DialogComponent,
    GuestAddComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    UsersListComponent,
    UsersEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    ReactiveFormsModule,
    Ng2Rut,
    MaterialModule,
    ChartsModule,
    HttpModule,
    RouterModule
  ],
  entryComponents: [EventNewComponent, GuestAddComponent, DialogComponent],
  providers: [
    AppConfig,
    EventService,
    MemberService,
    StatisticsService,
    GuestService,
    DialogsServiceService,
    SessionService,
    RutValidator,
    ProfileService,
    UserService,
    Angular2TokenService,
    PeopleDatabase,
    UsersDatabase,
    { provide: LOCALE_ID, useValue: "es-CL" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
