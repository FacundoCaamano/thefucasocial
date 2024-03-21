import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { NavbarComponent } from './dashboard-component/components/navbar/navbar.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ListComponent } from './dashboard-component/components/navbar/list/list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './dashboard-component/pages/home/home.component';
import { FriendsComponent } from './dashboard-component/pages/friends/friends.component';
import { ProfileComponent } from './dashboard-component/pages/profile/profile.component';
import { PostsComponent } from './dashboard-component/pages/posts/posts.component';
import { CardPostComponent } from './dashboard-component/pages/posts/components/card-post/card-post.component';
import {MatCardModule} from '@angular/material/card'

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListComponent,
    HomeComponent,
    FriendsComponent,
    ProfileComponent,
    PostsComponent,
    CardPostComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
