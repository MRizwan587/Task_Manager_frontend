import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
constructor(private authService: AuthService, private router: Router) {}
userName: string = "";
userRole: string = "";

ngOnInit() {
  const user = localStorage.getItem("user");

  if (user) {
    console.log("User from localstorage in navbar.ts",user);
    
    const parsedUser = JSON.parse(user);
    this.userName = parsedUser.name;  
    this.userRole = parsedUser.role;  
  }
}

  logout() {
    this.authService.logout(); // clears storage & redirects to login inside AuthService
    // Optional: if you want explicit navigation
    // this.router.navigate(['/login']);
  }
}
