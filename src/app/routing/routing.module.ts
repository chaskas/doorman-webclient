import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { MemberListComponent } from '../components/member/member-list/member-list.component';
import { MemberNewComponent } from '../components/member/member-new/member-new.component';
import { MemberEditComponent } from '../components/member/member-edit/member-edit.component';


const routes: Routes = [
 {  path: '', component: DashboardComponent ,
      children:[
        { path : '', component: CalendarComponent },
        { path : 'members', component: MemberListComponent },
        { path : 'newmembers', component: MemberNewComponent },
        { path : 'editmembers', component: MemberEditComponent }


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
