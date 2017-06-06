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
import { ChartsComponent } from '../components/charts/charts.component';

const routes: Routes = [
 {  path: '', component: DashboardComponent ,
      children:[
        { path : '', component: CalendarComponent },
        { path : 'members', component: MemberListComponent },
        { path : 'members/new', component: MemberNewComponent },
        { path : 'members/edit/:id', component: MemberEditComponent },
        { path : 'members/show/:id/edit', component: MemberEditComponent },
        { path : 'members/show/:id', component: MemberShowComponent },
        { path : 'invitados', component: MemberListInvitadosComponent },
        { path : 'charts', component: ChartsComponent }
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
