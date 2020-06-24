import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }), 
  withCredentials: true
};

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.css"]
})
export class RegistrationFormComponent {
  Model: any = {};
  
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    console.log(JSON.stringify(this.Model));
    return this.http
      .post(
        "https://localhost:44358/api/Authentication/register",
        JSON.stringify(this.Model), httpOptions)
      .subscribe(
        data => {
          ("https://localhost:4200");
          this.router.navigateByUrl("generic");
        },

        error => console.log(error)
      );
  }
}
