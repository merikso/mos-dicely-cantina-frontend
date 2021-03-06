import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user = new User(0, '', '', 0)
  public clientMessage = new ClientMessage('')

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  public registerUser(): void {
    this.userService.registerUser(this.user)
      .subscribe(
        data => this.clientMessage.message = `Succefully added ${data.username} to database.`,
        error => this.clientMessage.message = `Something bad happened: ${error}`
      )
      this.router.navigateByUrl('/login');
  }

}
