import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientMessage } from 'src/app/models/client-message';
import { LoginForm } from 'src/app/models/login-form';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})

export class LoginComponent {
  
  public clientMessage = new ClientMessage('')
  public lf = new LoginForm("", "");
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
 
  
  public login() {
    this.authenticationService.authenticate(this.lf.username, this.lf.password)
      .subscribe(
        data => {
          this.router.navigateByUrl('/map')
        },
        error => this.clientMessage.message = `We got an error : ${error}`,
      )
  }



  
}