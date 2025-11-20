import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { RegisterComponent } from "./features/auth/register/register.component";
const routes: Routes = [
  


  {
    path: "login",
    component: LoginComponent
    // loadChildren: () =>
    //   import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "register",
    component: RegisterComponent,
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
  // Main layout routes
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "dashboard",
        redirectTo: "user/dashboard", 
        pathMatch: "full",
      },
      {
        path: "user",
        loadChildren: () =>
          import("./features/user/user.module").then((m) => m.UserModule),
      },
      {
        path: "admin",
        loadChildren: () =>
          import("./features/admin/admin.module").then((m) => m.AdminModule),
      },
    ],
  },
  { path: "**", redirectTo: "/login" }, // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
