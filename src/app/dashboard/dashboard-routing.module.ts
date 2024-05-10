import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard-component/pages/home/home.component';
import { ProfileComponent } from './dashboard-component/pages/profile/profile.component';
import { FriendsComponent } from './dashboard-component/pages/friends/friends.component';
import { ProfileComponentComponent } from './dashboard-component/pages/profile/components/profile-component/profile-component.component';
import { PostComponentComponent } from './dashboard-component/pages/profile/components/post-component/post-component.component';

//import { authGuard } from '../core/auth.guard';


const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'profile',
    component:ProfileComponent,
    children:[
      {
        path:'profile',
        component:ProfileComponentComponent
      },{
        path:'posts',
        component:PostComponentComponent
      },
    ]
  },
  {
    path:'friends',
    component:FriendsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
