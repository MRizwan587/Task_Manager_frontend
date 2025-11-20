import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuList: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser(); // get logged-in user
    const role = user?.role || 'user'; // default to 'user' if null

    if (role === 'admin') {
      this.menuList = [
        { name: 'Dashboard', link: '/admin/dashboard', icon: 'dashboard' },
        { name: 'Tasks', link: '/admin/tasks', icon: 'task' },
        { name: 'Users', link: '/admin/users', icon: 'group' }
      ];
    } else {
      this.menuList = [
        { name: 'Dashboard', link: '/user/dashboard', icon: 'dashboard' },
        { name: 'My Tasks', link: '/user/tasks', icon: 'task' }
      ];
    }
  }

  // Optional: logout button
  logout() {
    this.authService.logout();
  }
}
