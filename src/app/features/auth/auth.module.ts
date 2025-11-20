import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, // For template-driven forms (Login)
    ReactiveFormsModule, // For reactive forms (Register)
    MaterialModule, // Angular Material components
  ],
})
export class AuthModule {}
