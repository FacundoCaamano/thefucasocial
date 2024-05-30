import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard-component/pages/home/home.component';
import { ProfileComponent } from './dashboard-component/pages/profile/profile.component';
import { FriendsComponent } from './dashboard-component/pages/friends/friends.component';
import { ProfileComponentComponent } from './dashboard-component/pages/profile/components/profile-component/profile-component.component';
import { PostComponentComponent } from './dashboard-component/pages/profile/components/post-component/post-component.component';
import { FriendsListComponent } from './dashboard-component/pages/friends/components/friends-list/friends-list.component';
import { FriendsRequestComponent } from './dashboard-component/pages/friends/components/friends-request/friends-request.component';



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
        path:'',
        component:ProfileComponentComponent
      },{
        path:'posts',
        component:PostComponentComponent
      },
    ]
  },
  {
    path:'friends',
    component:FriendsComponent,
    children:[
      {
        path: 'list',
        component:FriendsListComponent
      },
      {
        path:'request',
        component: FriendsRequestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
