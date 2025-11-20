import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AdminTaskListComponent } from './tasks/admin-task-list/admin-task-list.component';
import { AdminUserListComponent } from './users/admin-user-list/admin-user-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CreatetaskComponent } from './createtask/createtask.component';

import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminTaskListComponent,
    AdminUserListComponent,
    CreatetaskComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
