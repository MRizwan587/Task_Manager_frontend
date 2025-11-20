import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
   exports: [
    RouterModule,
    NavbarComponent,
    SidebarComponent,
   
  ]
})
export class SharedModule { }
