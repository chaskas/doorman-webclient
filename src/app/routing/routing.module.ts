import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { MemberListComponent } from '../components/member/member-list/member-list.component';
import { MemberNewComponent } from '../components/member/member-new/member-new.component';
import { MemberEditComponent } from '../components/member/member-edit/member-edit.component';
import { MemberShowComponent } from '../components/member/member-show/member-show.component';
import { EventShowComponent } from '../components/events/event-show/event-show.component';
import { LoginComponent } from '../components/session/login/login.component';
import { RegisterComponent } from '../components/session/register/register.component';
import { LogoutComponent } from '../components/session/logout/logout.component';
import { UsersListComponent } from '../components/users/users-list/users-list.component';

const routes: Routes = [
 {  path: '', component: DashboardComponent ,
      children:[
        { path: '', component: CalendarComponent },
        { path: 'members/new', component: MemberNewComponent, canActivate: [Angular2TokenService] },
        { path: 'members/:type', component: MemberListComponent, canActivate: [Angular2TokenService] },
        { path: 'members/edit/:id', component: MemberEditComponent, canActivate: [Angular2TokenService] },
        { path: 'members/show/:id', component: MemberShowComponent, canActivate: [Angular2TokenService] },
        { path: 'events/show/:id', component: EventShowComponent, canActivate: [Angular2TokenService] },
        { path: 'users', component: UsersListComponent, canActivate: [Angular2TokenService] },
        { path: 'users/new', component: RegisterComponent, canActivate: [Angular2TokenService] },
        
      ]
 },
 { path: 'signin', component: LoginComponent },
 { path: 'signout', component: LogoutComponent, canActivate: [Angular2TokenService] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutingModule { }
