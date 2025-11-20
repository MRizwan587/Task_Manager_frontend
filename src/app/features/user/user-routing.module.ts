import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { UserTaskListComponent } from './tasks/user-task-list/user-task-list.component';

const routes: Routes = [
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'dashboard/:id', component: UserDashboardComponent },
  { path: 'tasks', component: UserTaskListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
