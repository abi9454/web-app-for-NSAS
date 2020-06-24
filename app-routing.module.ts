import { NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
const routes: Route[] = [
    {path : 'signin' , component:SigninComponent },
    {path : "registration-form" , component:RegistrationFormComponent}
];
@NgModule ({
    imports : [RouterModule.forRoot(routes)],
    exports :[RouterModule]
})
export class AppRoutingModule{ }