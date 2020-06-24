import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { SigninComponent } from "./signin/signin.component";
import { PayPalComponent } from "./paypal/paypal.component";
import { MaterialModule } from "./material.module";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login";
import { FormsModule } from "@angular/forms";
import { AuthGuard } from "./auth.guard";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientXsrfModule } from "@angular/common/http";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { GenericComponent } from "./generic/generic.component";
import { EventComponent } from "./event/event.component";
// Configs
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        "875998994549-72h6o7ugtcc4ocsrhpa46sksep63b7ig.apps.googleusercontent.com"
      )
    }
  ]);
  return config;
}

const ROUTES: Route[] = [
  {
    path: "",
    component: HomepageComponent
  },
  {
    path: "login",
    component: SigninComponent
  },
  {
    path: "signup",
    component: RegistrationFormComponent
  },
  {
    path: "register",
    component: RegistrationFormComponent
  },
  {
    path: "generic",
    component: GenericComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "home",
    component: HomepageComponent
  },
  {
    path: "event",
    component: EventComponent
  },
  {
    path: "generics",
    component: GenericComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegistrationFormComponent,
    HomepageComponent,
    GenericComponent,
    PayPalComponent,
    EventComponent
    // HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientXsrfModule.withOptions({
      cookieName: "My-Xsrf-Cookie",
      headerName: "My-Xsrf-Header"
    }),
    SocialLoginModule
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
