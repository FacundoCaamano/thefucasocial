import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './dashboard/dashboard-component/pages/posts/store/posts.effects';
import { postReducer } from './dashboard/dashboard-component/pages/posts/store/post.reducer';
import { initialState as postInitialState } from './dashboard/dashboard-component/pages/posts/store/post.state';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { AppState } from './store/app.state';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    AuthModule,
    StoreModule.forRoot<AppState>({posts: postReducer}, { initialState: { posts: postInitialState } }),
    EffectsModule.forRoot([PostsEffects]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
