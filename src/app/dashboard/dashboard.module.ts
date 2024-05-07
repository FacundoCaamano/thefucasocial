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
import {MatCardModule} from '@angular/material/card';
import { CreatePostComponent } from './dashboard-component/pages/posts/components/create-post/create-post.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PostComponentComponent } from './dashboard-component/pages/profile/components/post-component/post-component.component';
import { ProfileComponentComponent } from './dashboard-component/pages/profile/components/profile-component/profile-component.component';
import { NavbarProfileComponent } from './dashboard-component/pages/profile/components/navbar-profile/navbar-profile.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListComponent,
    HomeComponent,
    FriendsComponent,
    ProfileComponent,
    PostsComponent,
    CardPostComponent,
    CreatePostComponent,
    PostComponentComponent,
    ProfileComponentComponent,
    NavbarProfileComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
