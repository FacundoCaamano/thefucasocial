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
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NavbarProfileComponent } from './dashboard-component/pages/profile/components/navbar-profile/navbar-profile.component';
import { PostsComponent } from './dashboard-component/pages/home/components/posts/posts.component';
import { CardPostComponent } from './dashboard-component/pages/home/components/posts/components/card-post/card-post.component';
import { CreatePostComponent } from './dashboard-component/pages/home/components/posts/components/create-post/create-post.component';
import { PostComponentComponent } from './dashboard-component/pages/profile/components/post-component/post-component.component';
import { ProfileComponentComponent } from './dashboard-component/pages/profile/components/profile-component/profile-component.component';
import { ProfileComponent } from './dashboard-component/pages/profile/profile.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FooterComponent } from './dashboard-component/components/footer/footer.component';
import { FriendsListComponent } from './dashboard-component/pages/friends/components/friends-list/friends-list.component';
import { FriendsRequestComponent } from './dashboard-component/pages/friends/components/friends-request/friends-request.component';
import { NavbarFriendsComponent } from './dashboard-component/pages/friends/components/navbar-friends/navbar-friends.component';
import { SearchComponent } from './dashboard-component/pages/friends/components/search/search.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogFriendsOptionsComponent } from './dashboard-component/pages/friends/components/dialog-friends-options/dialog-friends-options.component'
import {MatExpansionModule} from '@angular/material/expansion';
import { NotifierComponent } from './dashboard-component/components/notifier/notifier.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { ChatComponent } from './dashboard-component/components/chat/chat.component';
import { ChatWithFriendComponent } from './dashboard-component/components/chat/chat-with-friend/chat-with-friend.component';
import { CommentsComponent } from './dashboard-component/pages/home/components/posts/components/card-post/comments/comments.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListComponent,
    HomeComponent,
    FriendsComponent,
    PostsComponent,
    CardPostComponent,
    CreatePostComponent,
    PostComponentComponent,
    ProfileComponent,
    ProfileComponentComponent,
    NavbarProfileComponent,
    FooterComponent,
    FriendsListComponent,
    FriendsRequestComponent,
    NavbarFriendsComponent,
    SearchComponent,
    DialogFriendsOptionsComponent,
    NotifierComponent,
    ChatComponent,
    ChatWithFriendComponent,
    CommentsComponent,
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
    FormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRippleModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
