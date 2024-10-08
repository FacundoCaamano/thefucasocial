import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard-component/dashboard.component';

const routes: Routes = [
  {
    path:"dashboard",
    component:DashboardComponent,
    loadChildren:()=> import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:"auth",
    loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule)
  },
  // {
  //   path:'**',
  //   redirectTo:'dashboard/home'
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
