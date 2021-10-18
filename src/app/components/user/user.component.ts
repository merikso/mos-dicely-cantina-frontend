import { Component, OnInit } from '@angular/core';
import { UserArray } from './../../models/user';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user'



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username = sessionStorage.getItem("username")
  credits = sessionStorage.getItem("chips")

  u_id = 0
  chips = 0

  constructor(private userService: UserService) { }

  public getUser() {
    let uarray: UserArray = new UserArray([])
    let uarr: User[] = []
    let string = ""
    

    this.userService.findAllUsers()
    .subscribe(data => string = JSON.stringify(data))
    .add(() => { uarr = JSON.parse(string), console.log(uarr), 
    this.u_id = this.userService.findUserId(sessionStorage.getItem('username')!, uarr)
    console.log(this.u_id)
    this.getUserById()
  })
  }

  public getUserById() {
    this.userService.findByUserId(this.u_id)
    .subscribe(data => {this.u_id = data.id, this.chips = data.chips})
  }

  ngOnInit(): void {
    this.getUser();
  }

}
