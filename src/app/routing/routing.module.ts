import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CalendarComponent } from '../components/calendar/calendar.component';

const routes: Routes = [
 // { path: '', component: LoginComponent },
 { path: 'dash', component: DashboardComponent ,
    children:[
      { path : '', component: CalendarComponent },
 //      { path : 'business/profile', component: BusinessProfileComponent },
 //      { path : 'business/offers', component: BusinessOffersListComponent },
 //      { path : 'business/offers/show/:id', component: BusinessOffersShowComponent },
 //      { path : 'business/offers/edit/:id', component: BusinessOffersEditComponent },
 //      { path : 'business/offers/create', component: BusinessOffersCreateComponent},
 //      { path : 'business/detail/:id', component: BusinessDetailComponent },
 //      { path : 'business/branches/create', component: BusinessBranchCreateComponent},
 //      { path : 'business/branches/edit/:id', component: BusinessBranchEditComponent},
 //      { path : 'business/branches', component: BusinessBranchListComponent},
 //      { path : 'business/history/:id', component: HistoryComponent},
 //      { path : 'offer', component: OfferComponent},
 //      { path : 'offer/detail/:id', component: OfferDetailComponent},
 //      { path : 'apply', component: ApplyComponent },
 //      { path : 'profile', component: ProfileComponent},
 //      { path : 'profile/avatar', component: UserProfileAvatarComponent}
    ]
 },
 // { path: 'menu', component: MenuComponent, canActivate: [Angular2TokenService] },
 // { path: 'header', component: HeaderComponent },
 // { path: 'signin', component: LoginComponent },
 // { path: 'signup', component: RegisterComponent },
 // { path: 'logout', component: LogoutComponent, canActivate: [Angular2TokenService] }
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
