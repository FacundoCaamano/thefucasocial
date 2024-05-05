import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard-component/pages/home/home.component';
import { ProfileComponent } from './dashboard-component/pages/profile/profile.component';
import { FriendsComponent } from './dashboard-component/pages/friends/friends.component';
import { PostsComponent } from './dashboard-component/pages/posts/posts.component';
//import { authGuard } from '../core/auth.guard';


const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'posts',
    component:PostsComponent
  },
  {
    path:'profile',
    //canActivate:[authGuard],
    component:ProfileComponent
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
