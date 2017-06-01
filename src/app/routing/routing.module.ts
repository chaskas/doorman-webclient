import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { MemberListComponent } from '../components/member/member-list/member-list.component';
import { MemberNewComponent } from '../components/member/member-new/member-new.component';
import { MemberEditComponent } from '../components/member/member-edit/member-edit.component';
import { MemberListInvitadosComponent } from '../components/member/member-list/member-list-invitados/member-list-invitados.component';
import { MemberShowComponent } from '../components/member/member-show/member-show.component';
<<<<<<< HEAD

=======
>>>>>>> 8e9607ff3baac016fdf770daf9d1b382fc39a4d2

const routes: Routes = [
 {  path: '', component: DashboardComponent ,
      children:[
        { path : '', component: CalendarComponent },
        { path : 'members', component: MemberListComponent },
        { path : 'members/new', component: MemberNewComponent },
        { path : 'members/edit/:id', component: MemberEditComponent },
<<<<<<< HEAD
        { path : 'members/show', component: MemberShowComponent },
        { path : 'invitados', component: MemberListInvitadosComponent }
=======
        { path : 'members/show/:id/edit', component: MemberEditComponent },
        { path : 'invitados', component: MemberListInvitadosComponent },
        { path : 'members/show/:id', component: MemberShowComponent }
>>>>>>> 8e9607ff3baac016fdf770daf9d1b382fc39a4d2
      ]
 },
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
