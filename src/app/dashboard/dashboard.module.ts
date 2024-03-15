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
@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
