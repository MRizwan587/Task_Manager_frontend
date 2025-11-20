import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { LoginRequest } from "src/app/core/models/user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginData: LoginRequest = { email: "", password: "" };
  loading = false;
  errorMessage = "";
  hidePassword = true;
  role='user';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/user/dashboard"]);
    }
  }

  onSubmit(): void {
  this.errorMessage = "";
  this.loading = true;

  if (!this.loginData.email || !this.loginData.password) {
    this.errorMessage = "Please fill in all fields";
    this.loading = false;
    return;
  }

 this.authService.login(this.loginData).subscribe({
  next: (res) => {
    this.loading = false;

    if (res.success) {

      const user = res.data.user;
      if (user.status === 'deactive') {
        this.errorMessage = "Your account has been deactivated by the admin. Please contact support.";
        return; 
      }

      if (user.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else if (user.role === 'user') {
        this.router.navigate([`/user/dashboard`]);
        console.log("toward user dashboard with id");
        
      }

    } else {
      this.errorMessage = res.message || "Login failed";
    }
  },
  error: (error) => {
    this.errorMessage =
      error.error?.message || "An error occurred during login";
    this.loading = false;
  },
});
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

   navigateToRegister(): void {
    this.router.navigate(["/register"], { replaceUrl: true });
  }
}
