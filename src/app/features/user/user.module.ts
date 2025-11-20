import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { UserTaskListComponent } from './tasks/user-task-list/user-task-list.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserTaskListComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class UserModule { }
