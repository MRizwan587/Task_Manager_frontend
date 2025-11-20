import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AdminTaskListComponent } from './tasks/admin-task-list/admin-task-list.component';
import { UserDashboardComponent } from '../user/dashboard/user-dashboard/user-dashboard.component';
import { AdminUserListComponent } from './users/admin-user-list/admin-user-list.component';
import { CreatetaskComponent } from './createtask/createtask.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'tasks', component: AdminTaskListComponent },
  { path: 'users', component: AdminUserListComponent  },
  { path: 'createtask', component: CreatetaskComponent},
  { path: 'users', component: AdminUserListComponent  },
  { path: 'createtask/:id', component: CreatetaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
