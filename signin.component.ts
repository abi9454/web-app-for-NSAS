import { Component, OnInit } from "@angular/core";
import { AuthService, GoogleLoginProvider } from "angular-6-social-login";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { error } from "util";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./assets/css/main.css"]
})
export class SigninComponent implements OnInit {
  email: string;

  ngOnInit() {}

  constructor(
    private socialAuthService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  public loginWithGoogle() {
    let googlePlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(googlePlatformProvider).then(userData => {
      console.log(" sign in data : ", userData);
      this.sendUserDataToAPI(userData);
      this.email = userData.email;
      // this.router.navigate(['./generic']);
    });
  }

  public logout() {
    this.email = undefined;
  }

  public navigateToPage(page: string) {
    this.router.navigateByUrl("/" + page);
  }
  Home(){
    this.router.navigateByUrl("home");
  }
  public sendUserDataToAPI(userData) {
    return this.http
      .post("https://localhost:44358/api/Authentication/userExists", {
        Email: userData.email
      })
      .subscribe(
        data => {
          console.log(data);
          var temp = data;
          if (data) {
            return this.http
              .post("https://localhost:44358/api/Authentication/Login", {
                Email: userData.email,
                Token: userData.token
              })
              .subscribe(
                (data: any) => {
                  if (data) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("currentUser", JSON.stringify(data));

                    this.navigateToPage("generic");
                  }
                },
                error => console.log(error)
              );
          } else {
            this.socialAuthService.signOut().then(() => {
              this.navigateToPage("register");
            });
          }
        },
        error => console.log(error)
      );
  }
}
